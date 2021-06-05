import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from './../../../../apis/firebaseClient';
import { Link } from 'react-router-dom';
import EditCategories from './EditCategories';
import AddCategories from './AddCategories';
class ManagerCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCloseLoader: 'flex'
        }
    }
    addCategories = (e, imageName, dataFile) => {
        let postCategories = firebase.database().ref('Categories');
        postCategories.push(e)
            .then(() => {
                postCategories = firebase.storage().ref(`Images/Categories/${imageName}`);
                postCategories.put(dataFile)
                    .then(() => {
                        this.renderCatecories();
                        this.closeAddCategories();
                    });
            }
            )
    }
    deleteCategories = (e) => {
        let post = firebase.database().ref('Categories');
        post.child(e).remove()
            .then(() => {
                this.renderCatecories();
            })
    }
    updateCategories = (key, contentUpdate) => {
        let post = firebase.database().ref('Categories');
        post.child(key).update({
            name: contentUpdate
        })
            .then(() => {
                console.log('update thành công ....');
                this.renderCatecories();
            })
    }
    componentDidMount() {
        this.renderCatecories();
    }
    renderCatecories = () => {
        let getData = firebase.database().ref('Categories');
        getData.once('value')
            .then(datasnapshot => {
                const arrCategories = [];
                datasnapshot.forEach(data => {
                    let obj = {};
                    obj.field = data.val();
                    obj.ID = data.key;
                    arrCategories.push(obj);
                });
                return arrCategories;
            })
            .then(data => this.setState({ data, isCloseLoader: 'none' })
            );
    }
    closeAddCategories = () => {
        ReactDOM.unmountComponentAtNode(document.getElementsByClassName('renderAddCategories')[0]);
    }
    renderAddCategories = () => {
        ReactDOM.render(<AddCategories addCategories={this.addCategories} />, document.getElementsByClassName('renderAddCategories')[0]);

    }
    editContent = (value, key) => {
        ReactDOM.render(<EditCategories updateCategories={this.updateCategories} IDCategories={value.ID} id={key} data={value.field} />, document.getElementsByClassName('renderInfo')[key]);
    }
    render() {
        return (
            <div className="managerCategories">
                <div style={{ display: this.state.isCloseLoader, position: 'absolute', borderRadius: '10px' }} className="boxLoaderForHome">
                    <div style={{ padding: '0%' }} className="lds-dual-ring"></div>
                </div>
                <div className="managerProducts__header">
                    <button style={{ marginLeft: '0' }} onClick={this.renderAddCategories}><i style={{ marginRight: '5px' }} className="fa fa-plus-circle" aria-hidden="true"></i>Thêm danh mục</button>
                    <Link to="/Admin/Dashboard" style={{ background: '#dc3545' }}><i className="fa fa-times" aria-hidden="true"></i>Quay lại</Link>
                    <div className='renderAddCategories'>

                    </div>
                </div>
                <div className="table">
                    <div>
                        <p style={{ width: "15%", textAlign: 'center' }}>STT</p>
                        <p style={{ width: "30%" }}>Tên danh mục</p>
                        <p style={{ width: "25%" }}>Thời gian tạo</p>
                        <p style={{ width: "30%" }}>Hành động</p>
                    </div>
                    {typeof this.state.data !== 'undefined' ? this.state.data.map((value, key) => {
                        return (
                            <div className='table__Childrent' key={key}>
                                <p style={{ width: "15%", fontWeight: '500', textAlign: 'center' }}>{key + 1}</p>
                                <p style={{ width: "30%", textTransform: 'uppercase', fontWeight: '700' }}>{value.field.name}</p>
                                <p style={{ width: "25%", fontWeight: 500 }}>{value.field.creationTime}</p>
                                <p style={{ width: "30%" }}>
                                    <button onClick={() => this.editContent(value, key)}>
                                        <i style={{ marginRight: '5px' }} className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                        Sửa
                                </button>
                                    <button onClick={() => this.deleteCategories(value.ID)}>
                                        <i style={{ marginRight: '5px' }} className="fa fa-trash-o" aria-hidden="true"></i>
                                        Xóa
                                </button>
                                </p>
                                <div style={{ width: '100%' }} className='renderInfo'>

                                </div>
                            </div>
                        )
                    }) : <center>Chưa có danh mục nào</center>}
                </div>
            </div>
        );
    }
}

export default ManagerCategories;