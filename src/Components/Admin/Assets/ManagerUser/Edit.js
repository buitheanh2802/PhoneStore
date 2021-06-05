import React, { Component } from 'react';
import firebase from './../../../../apis/firebaseClient';
import reactDOM from 'react-dom';
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startUpdate: false,
            imageUrl: '',
            name: this.props.user.data.name,
            email: this.props.user.data.email,
            phoneNumber: this.props.user.data.phoneNumber,
            isManager: this.props.user.data.isManager,
            gender: this.props.user.data.gender,
            dateOfBirth: this.props.user.data.dateOfBirth,
            newImage: '',
            oldImage: this.props.user.data.image,
            timeUpdate: this.props.user.data.timeUpdate
        }
    }
    changeImage = (e) => {
        let image = e.target.files[0];
        this.setState({
            newImage: image.name,
            dataNewImage: image
        })
        this.parseURLForImage(image);
    }
    parseURLForImage = (file) => {
        let fileRender = new FileReader();
        fileRender.readAsDataURL(file);
        // console.log(fileData)
        fileRender.onload = (file) => {
            this.setState({
                imageUrl: file.target.result
            })
        }
    }
    componentDidMount() {
        const imageUrl = firebase.storage().ref('Images/Users/' + this.props.user.data.image);
        imageUrl.getDownloadURL()
            .then((data) => {
                this.setState({
                    imageUrl: data
                })
            })
            .then(() => {
                setTimeout(() => {
                    document.getElementsByClassName('loaderForEditUser')[0].style.display = 'none';
                }, 800);
            })
    }
    changeManager = () => {
        if (this.state.isManager === 1) {
            this.setState({
                isManager: 0
            })
        }
        else {
            this.setState({
                isManager: 1
            })
        }
    }
    getData = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    getDataForGender = (e) => {
        this.setState(
            {
                gender: e.target.value
            }
        )
    }
    closeForm = (key) => {
        reactDOM.unmountComponentAtNode(document.getElementsByClassName('editForm')[key]);
    }
    updateForm = () => {
        document.getElementsByClassName('loaderForEditUser')[0].style.display = 'flex';
        let time = new Date();
        let dataTime = time.getDate() + '-' + (time.getMonth() + 1) + '-' + time.getFullYear() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        if (this.state.newImage !== '') {
            this.setState({
                image: this.state.newImage
            })
            let data = firebase.storage().ref('Images/Users');
            data.child(this.state.oldImage).delete()
                .then(() => {
                    console.log("Xóa hình ảnh thành công !");
                })
                .then(() => {
                    let uploadNewImage = firebase.storage().ref('Images/Users/' + this.state.newImage);
                    uploadNewImage.put(this.state.dataNewImage)
                        .then(() => {
                            this.setState({
                                image: this.state.newImage,
                                startUpdate: true,
                                timeUpdate: dataTime
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                })
                .catch((error) => {
                    console.log("Error : " + error);
                })
        }
        else {
            this.setState({
                image: this.state.oldImage,
                startUpdate: true,
                timeUpdate: dataTime
            })
        }
    }
    startUpdate = () => {
        const data = firebase.database().ref('Users');
        data.child(this.props.user.key).update(
            {
                name: this.state.name,
                gender: this.state.gender,
                dateOfBirth: this.state.dateOfBirth,
                email: this.state.email,
                isManager: this.state.isManager,
                phoneNumber: this.state.phoneNumber,
                image: this.state.image,
                timeUpdate: this.state.timeUpdate
            }
        )
            .then(() => {
                console.log("Upload dữ liệu thành công !!!");
                document.getElementsByClassName('loaderForEditUser')[0].style.display = 'none';
                this.props.changePreload(true);
                this.setState({
                    startUpdate: false
                });
                this.closeForm(this.props.id);
            })
    }
    render() {
        if (this.state.startUpdate === true) {
            this.startUpdate();
        }
        return (
            <div className="user__edit">
                <div style={{ width: '100%' }} className="loaderForEditUser">
                    <div className="managerProduct__detail-loader">
                        <div><div></div></div>
                        <div>
                            <div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user__title">Thông tin</div>
                <div className="user__info-edit">
                    <div>
                        <p><label>Họ và tên :</label><input onChange={this.getData} name="name" type='text' defaultValue={this.state.name} /></p>
                        <p><label>Email :</label><input onChange={this.getData} name="email" type='text' defaultValue={this.state.email} /></p>
                        <p><label>Số điện thoại :</label><input onChange={this.getData} name="phoneNumber" type='text' defaultValue={this.state.phoneNumber} /></p>
                        {(this.props.user.data.gender === 'Nam') ?
                            <p>
                                <label>Giới tính : </label>
                                <label style={{ minWidth: '76px', fontWeight: 'normal' }}>
                                    <input name={"gender" + this.props.id} onChange={this.getDataForGender} defaultValue="Nam" defaultChecked={true} type="radio" />Nam
                                </label>
                                <label style={{ fontWeight: 'normal' }}>
                                    <input name={"gender" + this.props.id} onChange={this.getDataForGender} defaultValue="Nữ" type="radio" />Nữ
                                </label>
                            </p> :
                            <p>
                                <label>Giới tính : </label>
                                <label style={{ minWidth: '76px', fontWeight: 'normal' }}>
                                    <input name={"gender" + this.props.id} onChange={this.getDataForGender} defaultValue="Nam" type="radio" />Nam
                                </label>
                                <label style={{ fontWeight: 'normal' }}>
                                    <input name={"gender" + this.props.id} onChange={this.getDataForGender} defaultValue="Nữ" defaultChecked={true} type="radio" />Nữ
                                </label>
                            </p>
                        }
                        <p><label>Ngày sinh :</label><input name="dateOfBirth" onChange={this.getData} type='date' defaultValue={this.state.dateOfBirth} /></p>
                        <p><label>Quyền : </label>{(this.state.isManager === 1) ?
                            <span onClick={this.changeManager}><i style={{ marginRight: '7px' }} className="fa fa-toggle-on effectInIconON" aria-hidden="true"></i><span>Quản trị</span></span> :
                            <span onClick={this.changeManager}><i style={{ marginRight: '7px' }} className="fa fa-toggle-off effectInIconOFF" aria-hidden="true"></i><span>Thành viên</span></span>}
                        </p>
                    </div>
                    <div>
                        <p>Ảnh đại diện</p>
                        <input name={'file' + this.props.id} onChange={this.changeImage} id={"editImage" + this.props.id} type="file" hidden />
                        <label style={{ alignSelf: 'center' }} htmlFor={"editImage" + this.props.id}>
                            <img src={this.state.imageUrl} alt="ảnh đại diện" />
                        </label>
                        <p className="user__timer">Cập nhật lần cuối ngày : {this.state.timeUpdate}</p>
                    </div>
                </div>
                <div className="user__submit">
                    <button onClick={this.updateForm}><i style={{ marginRight: '5px' }} className="fa fa-pencil-square-o" aria-hidden="true"></i>Cập nhật</button>
                    <button onClick={() => this.closeForm(this.props.id)}><i style={{ marginRight: '5px' }} className="fa fa-times" aria-hidden="true"></i>Đóng lại</button>
                </div>
            </div>
        );
    }
}

export default Edit;