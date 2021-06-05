import React, { Component } from 'react';
import firebase from './../../../../apis/firebaseClient';
import ReactDOM from 'react-dom';
class Delete extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    closeFormDelete = () => {
        ReactDOM.unmountComponentAtNode(document.getElementsByClassName('editForm')[this.props.id]);
    }
    startDeleteField = () => {
        let deleteImage = firebase.storage().ref('Images/Users');
        deleteImage.child(this.props.user.data.image).delete()
            .then(() => {
                console.log('Xoa image thanh cong....');
                let deleteField = firebase.database().ref('Users');
                deleteField.child(this.props.user.key).remove()
                    .then(() => {
                        console.log('Đã xóa toàn bộ dữ liệu');
                        this.closeFormDelete();
                        this.props.changePreload(true);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        return (
            <div className="user__delete">
                <div className="user__delete-title">
                    Bạn có chắc chắn muốn xóa trường dữ liệu này không ?
                </div>
                <div className="user__delete-confirm">
                    <button onClick={this.startDeleteField}><i style={{ marginRight: '5px' }} className="fa fa-check" aria-hidden="true"></i>Đồng ý</button>
                    <button onClick={this.closeFormDelete}><i style={{ marginRight: '5px' }} className="fa fa-times" aria-hidden="true"></i>Hủy bỏ</button>
                </div>
            </div>
        );
    }
}

export default Delete;