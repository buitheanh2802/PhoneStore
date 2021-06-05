import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from './../../../../apis/firebaseClient';
class DeleteProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayLoader: 'none',
            contentLoader: 'Đang xóa dữ liệu....'
        }
    }
    closeFormDelete = () => {
        ReactDOM.unmountComponentAtNode(document.getElementsByClassName('dataRender')[this.props.id]);
    }
    startDeleteImageFromFirebase = (URL, key) => {
        const data = firebase.storage().ref(URL);
        data.child(key).delete()
            .then(() => {
                console.log('delete successful....');
            })
    }
    startDeleteField = () => {
        this.setState({ displayLoader: 'flex' });
        const field = firebase.database().ref('Products');
        field.child(this.props.data.id).remove()
            .then(() => {
                console.log('delete thanh cong .....');
            })
            .then(() => {
                this.props.data.data.sliders.forEach(value => {
                    this.startDeleteImageFromFirebase('Images/Products/' + this.props.data.data.IDProduct + '/SlidesProduct', value);
                })
                const deleteAvatar = firebase.storage().ref('Images/Products/' + this.props.data.data.IDProduct)
                deleteAvatar.child(this.props.data.data.imageProduct).delete()
                    .then(() => {
                        const deleteAvatarDetail = firebase.storage().ref('Images/Products/' + this.props.data.data.IDProduct);
                        deleteAvatarDetail.child(this.props.data.data.imageProductDetail).delete()
                            .then(() => {
                                this.setState({ contentLoader: 'Xóa dữ liệu thành công ...' })
                                setTimeout(() => {
                                    this.setState({displayLoader : 'none'});
                                    this.props.reloadPage(true);
                                    ReactDOM.unmountComponentAtNode(document.getElementsByClassName('dataRender')[this.props.id]);
                                },2000)
                            })
                    })
            })
    }
    render() {
        return (
            <div style={{ minHeight: '110px' }} className="user__delete">
                <div style={{ display: this.state.displayLoader, zIndex: 1 }} className="addProduct__loader">
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    <div>{this.state.contentLoader}</div>
                </div>
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

export default DeleteProduct;