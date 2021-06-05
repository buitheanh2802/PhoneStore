import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from './../../../../apis/firebaseClient';
import { Link } from 'react-router-dom';
import DetailProduct from './DetailProduct';
import ConfigProducts from './ConfigProducts';
import DeleteProduct from './DeleteProduct';

class ManagerProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            closeDetailProductAt: 0,
            loader: 'flex',
            reloadPage : false
        }
    }
    componentDidMount() {
       this.renderProductsFromFirebase();
    }
    isReloadPage = (e) =>
    {
        this.setState(
            {
                reloadPage : e
            }
        )
    }
    renderProductsFromFirebase = () =>
    {
        let dataArr = [];
        let data = firebase.database().ref('Products');
        data.once('value')
            .then(datasnapshot => {
                datasnapshot.forEach((data) => {
                    const field = {};
                    field.data = data.val();
                    field.id = data.key;
                    dataArr.push(field);
                })
            })
            .then(() => {
                this.setState({
                    data: dataArr,
                    reloadPage : false
                })
                setTimeout(() => {
                   this.setState({
                    loader : 'none'
                   })
                },800);
            })
    }
    renderInfoProduct = (value, key) => {
        ReactDOM.unmountComponentAtNode(document.getElementsByClassName('dataRender')[this.state.closeDetailProductAt]);
        ReactDOM.render(<DetailProduct product={value} id = {key} />, document.getElementsByClassName('dataRender')[key])
        this.setState({
            closeDetailProductAt: key
        })
    }
    renderDeleteForm = (value,key) =>
    {
        ReactDOM.render(<DeleteProduct reloadPage = {(e) => this.isReloadPage(e)} data = {value} id = {key} />,document.getElementsByClassName('dataRender')[key]);
    }
    renderConfigProduct = (value, key) => {
        ReactDOM.unmountComponentAtNode(document.getElementsByClassName('dataRender')[this.state.closeDetailProductAt]);
        ReactDOM.render(<ConfigProducts product={value} id = {key} />, document.getElementsByClassName('dataRender')[key])
        this.setState({
            closeDetailProductAt: key
        })
    }
    formart(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    render() {
        if(this.state.reloadPage === true)
        {
            this.renderProductsFromFirebase();
        }
        return (
            <div id = 'scrollForManagerProduct' className='managerProducts'>
                <div style = {{display : this.state.loader}} className='loaderForManagerUser'>
                    <div style = {{paddingTop : 0}} className='lds-dual-ring'></div>
                </div>
                <div className='managerProducts__header'>
                    <Link style = {{marginLeft : '0px'}} to='/Admin/Products/AddProduct'><i className='fa fa-plus-circle' aria-hidden='true'></i>Thêm sản phẩm</Link>
                    <Link to='/Admin/Dashboard' style={{ background: '#dc3545' }}><i className='fa fa-times' aria-hidden='true'></i>Quay lại</Link>
                </div>
                <div className='managerProducts__content'>
                    <div>
                        <p style={{ width: '4%' }}>STT</p>
                        <p style={{ width: '42%'}}>Tên sản phẩm</p>
                        <p style={{ width: '9%' }}>Giá sản phẩm</p>
                        <p style={{ width: '16%' }}>Lượt xem</p>
                        <p style={{ width: '29%' }}>Hành động</p>
                    </div>
                    {(this.state.data.length > 0) ? this.state.data.map((value, key) => {
                        let price = this.formart(value.data.price);
                        return (<div key={key} className='managerProduct__child'>
                            <p style={{ width: '4%' }}>{key + 1}</p>
                            <p style={{ width: '42%', fontSize: '14px', overflow: 'hidden', height: '37px',textAlign : 'start' ,fontWeight : '500'}}>{value.data.nameProduct}</p>
                            <p style={{ width: '9%', fontWeight: '500', color: 'red' }}>{price}₫</p>
                            <p style={{ width: '16%' }}>{value.data.view}</p>
                            <p style={{ width: '29%'}}>
                                <button><i className='fa fa-angle-down' aria-hidden='true'></i>Chi tiết
                                    <ul>
                                        <li onClick={() => this.renderInfoProduct(value, key)}>Thông tin</li>
                                        <li onClick = {() =>this.renderConfigProduct(value,key)}>Slides & Config</li>
                                    </ul>
                                </button>
                                <Link to = {'/Admin/Products/EditProduct/' + value.id + '.html'}><i style = {{marginRight : '5px'}} className='fa fa-pencil-square-o' aria-hidden='true'></i>Sửa</Link>
                                <button onClick = {() => this.renderDeleteForm(value,key)}><i className='fa fa-trash-o' aria-hidden='true'></i>Xóa</button>
                            </p>
                            <div style= {{width : '100%'}} className='dataRender'>
                                 
                            </div>
                        </div>)
                    }) : <div><p style = {{textAlign: 'center',display: 'blocl',width: '100%',fontSize:'17px',fontWeight:'500'}}>Chưa có sản phẩm nào ....</p></div>}
                </div>
            </div>
        );
    }
}

export default ManagerProducts;