import React, { Component } from 'react';
import firebase from './../../../apis/firebaseClient';
import { Redirect } from 'react-router-dom';
import './Register.css';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: "Nam",
            resultData: "Đang đăng kí....",
            isRedirect: false
        }
    }
    prepareUploadFile = (e) => {
        const file = e.target.files[0];
        this.renderFileDemo(file);
        this.setState({
            image: file.name,
            imageData: file
        })
    }
    getData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })

    }
    renderFileDemo = (e) => {
        let fileRender = new FileReader();
        fileRender.readAsDataURL(e);
        fileRender.onload = (e) => {
            const image = document.getElementById("showImage");
            image.src = e.target.result;
            const buttonUploadFile = document.getElementById("buttonShowUploadFile");
            buttonUploadFile.style.display = "none";
        }
    }
    submitForm = (e) => {
        e.preventDefault();
        let time = new Date();
        let dataTime = time.getDate() + '-' + (time.getMonth() + 1) + '-' + time.getFullYear() + ' ' +  time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        const data = {};
        data.name = this.state.name;
        data.dateOfBirth = this.state.dateOfBirth;
        data.email = this.state.email;
        data.password = this.state.password;
        data.phoneNumber = this.state.phoneNumber;
        data.gender = this.state.gender;
        data.image = this.state.image;
        data.timeUpdate = dataTime;
        data.isManager = 0;
        document.getElementsByClassName('loader')[0].style.width = "100%";
        document.getElementsByClassName('loader')[0].style.overflow = "unset";
        const getDataToFirebase = firebase.database().ref("Users");
        getDataToFirebase.push(data)
            .then(() => {
                const uploadImage = firebase.storage().ref('Images/Users/' + this.state.image);
                uploadImage.put(this.state.imageData)
                    .then(() => {
                        this.setState({
                            resultData: 'Đăng kí thành công '
                        })
                    })
                    .then(() => {
                        setTimeout(() => {
                            document.getElementsByClassName('loader')[0].style.width = "0%";
                            document.getElementsByClassName('loader')[0].style.overflow = "hidden";
                            this.setState({
                                isRedirect: true
                            })
                        }, 5000)
                    })
            })
    }
    render() {
        if (this.state.isRedirect === true) {
            return <Redirect to="/Login" />
        }
        return (
            <div className="register">
                <div className="loader">
                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    <div>{this.state.resultData}</div>
                </div>
                <div className="register__title">Đăng kí tài khoản </div>
                <div className="register__content">
                    <div className="register__boxImage">
                        <p>Ảnh đại diện</p>
                        <input onChange={this.prepareUploadFile} id="image" hidden={true} type="file" />
                        <label htmlFor="image" >
                            <img id="showImage" alt="Upload file" src="https://cadrre.org/wp-content/uploads/2018/04/social-hub-profile-default.jpg" />
                            <i id="buttonShowUploadFile" className="fa fa-upload" aria-hidden="true"></i>
                        </label>
                    </div>
                    <form autoComplete="off" className="register__form">
                        <div>
                            <p><i className="fa fa-user" aria-hidden="true"></i>Họ và tên</p>
                            <input onChange={this.getData} name="name" type="text" placeholder="Nhập tên của bạn..." />
                        </div>
                        <div>
                            <p><i className="fa fa-user" aria-hidden="true"></i>Năm sinh</p>
                            <input onChange={this.getData} name="dateOfBirth" type="date" placeholder="Nhập năm sinh của bạn..." />
                        </div>
                        <div>
                            <p><i className="fa fa-user" aria-hidden="true"></i>Gới tính</p>
                            <label>
                                <input onChange={this.getData} defaultChecked={true} name="gender" type="radio" value="Nam" />Nam
                            </label>
                            <label>
                                <input onChange={this.getData} name="gender" type="radio" value="Nữ" />Nữ
                            </label>
                        </div>
                        <div>
                            <p><i className="fa fa-user" aria-hidden="true"></i>Email</p>
                            <input onChange={this.getData} name="email" type="email" placeholder="Nhập Email của bạn..." />
                        </div>
                        <div>
                            <p><i className="fa fa-user" aria-hidden="true"></i>Số điện thoại</p>
                            <input onChange={this.getData} name="phoneNumber" type="number" placeholder="Nhập số điện thoại của bạn...." />
                        </div>
                        <div>
                            <p><i className="fa fa-user" aria-hidden="true"></i>Mật khẩu</p>
                            <input onChange={this.getData} name="password" type="password" placeholder="Nhập mật khẩu của bạn...." />
                        </div>
                        <div>
                            <button onClick={this.submitForm} type="submit">Đăng kí</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default Register;

