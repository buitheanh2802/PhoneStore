import React, { Component } from 'react';
import './Product.css';
import ProductChild from './Product/ProductChild';
import firebase from './../../../../apis/firebaseClient';
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            newProducts: [],
            isCloseLoader: 'flex',
            isAddClass: ''
        }
    }
    //after render when call componentDidmount
    componentDidMount() {
        this.getDataFromFirebase();
    }
    //end componentdidmount

    //create function to slug for URL product 
    to_slug = (str) => {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();

        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');

        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');

        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');

        // return
        return str;
    }
    //end expression function

    //create arrow function call api to firebase
    getDataFromFirebase = () => {
        const arrProduct = [];
        const data = firebase.database().ref('Products');
        data.once('value')
            .then(dataSnapshot => {
                //lấy toàn bộ dữ liệu đẩy vào mảng 
                dataSnapshot.forEach(childrent => {
                    //create object
                    const obj = {};
                    obj.dataProduct = childrent.val();
                    obj.idProduct = childrent.key;
                    const renderUrlImage = firebase.storage().ref('Images/Products/' + childrent.val().IDProduct + '/' + childrent.val().imageProduct);
                    renderUrlImage.getDownloadURL()
                        .then(url => {
                            obj.urlImageProduct = url
                        })
                        //đẩy obj vào mảng 
                        .then(() => {
                            arrProduct.push(obj);
                            //setstate 
                            this.setState({ data: arrProduct });
                            setTimeout(() => {
                                document.getElementsByClassName('boxLoaderForHome')[0].classList.add('animationLoader');
                                document.getElementsByClassName('boxLoaderForHome')[0].addEventListener('animationend', () => {
                                    this.setState({ isCloseLoader: 'none' });
                                });
                            }, 200);
                        });
                });
            });
    }
    //end function call api

    //create arrow function render new Product 
    renderNewsProducts = () => {
        const sort = this.state.data.sort((a, b) => {
            return new Date(b.dataProduct.dayUpdate + ' ' + b.dataProduct.timeUpdate) - new Date(a.dataProduct.dayUpdate + ' ' + a.dataProduct.timeUpdate)
        }
        );
        //total product = data.length
        //số sản phẩm mới muốn lấy = 4 (sản phẩm mới được cập nhật after)
        // => ex : map (0) else length => 1
        // const newProducts = this.state.data.length - 4;
        return sort.map((value, key) => {
            if (key < 4) {
                return (
                    <ProductChild
                        oldPrice={this.formart(value.dataProduct.oldPrice)}
                        weight={value.dataProduct.configProduct[8]}
                        CPU={value.dataProduct.configProduct[0]}
                        graphics={value.dataProduct.configProduct[6]}
                        screen={value.dataProduct.configProduct[3]}
                        price={this.formart(value.dataProduct.price)}
                        image={value.urlImageProduct}
                        name={value.dataProduct.nameProduct}
                        key={key}
                        id={value.dataProduct.IDProduct}
                        slug={this.to_slug(value.dataProduct.nameProduct)}
                        totalComment={(value.dataProduct.commentBy) ? value.dataProduct.commentBy.filter(data =>
                            {
                                return data !== null
                            }) : 0}
                        views={value.dataProduct.view}
                    />
                )
            }
            return null;
        });
    }
    renderMostView = () => {
        const mostview = this.state.data.sort((a, b) => {
            return b.dataProduct.view - a.dataProduct.view;
        }
        );
        //total product = data.length
        //số sản phẩm mới muốn lấy = 4 (sản phẩm mới được cập nhật affter)
        // => ex : map (0) else length => 1
        // const newProducts = this.state.data.length - 4;
        return mostview.map((value, key) => {
            if (key < 4) {
                return (
                    <ProductChild
                        oldPrice={this.formart(value.dataProduct.oldPrice)}
                        weight={value.dataProduct.configProduct[8]}
                        CPU={value.dataProduct.configProduct[0]}
                        graphics={value.dataProduct.configProduct[6]}
                        screen={value.dataProduct.configProduct[3]}
                        price={this.formart(value.dataProduct.price)}
                        image={value.urlImageProduct}
                        name={value.dataProduct.nameProduct}
                        key={key}
                        id={value.dataProduct.IDProduct}
                        slug={this.to_slug(value.dataProduct.nameProduct)}
                        totalComment={(value.dataProduct.commentBy) ? value.dataProduct.commentBy.filter(data =>
                            {
                                return data !== null
                            }) : 0}
                        views={value.dataProduct.view}
                    />
                )
            }
            return null;
        });
    }
    //create arrow function formart price 
    formart = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    //end function formart

    //start render component 
    render() {

        return (
            <div className="product">
                <div style={{ display: this.state.isCloseLoader}} className="boxLoaderForHome">
                    <div style = {{width : '70px',height : '70px'}} className="lds-dual-ring"></div>
                </div>
                <div className="product__box">
                    <h3 style={{ color: '#c90000' }} className="product__box-title">
                        <i style={{ marginRight: '1%', fontSize: '19px', color: '#969696' }} className="fa fa-chevron-right" aria-hidden="true"></i>SẢN PHẨM MỚI CẬP NHẬT</h3>
                    <div className="main__product">
                        {/*Render news Products*/}
                        {(this.state.data.length > 0) ? this.renderNewsProducts() : null}
                        {/*End render news Products */}
                    </div>
                    <h3 style={{ marginTop: '30px' }} className="product__box-title">
                        <i style={{ marginRight: '1%', fontSize: '19px', color: '#969696' }} className="fa fa-chevron-right" aria-hidden="true"></i>
                      XEM NHIỀU NHẤT</h3>
                    <div className="main__product">
                        {/*Render mostView Products*/}
                        {(this.state.data.length > 0) ? this.renderMostView() : null}
                        {/*End render mostView Products */}
                    </div>
                    {/* <h3 style={{ marginTop: '30px' }} className="product__box-title">
                        <i style={{ marginRight: '1%', fontSize: '19px', color: '#969696' }} className="fa fa-chevron-right" aria-hidden="true"></i>
                    ASUS</h3>
                    <div className="main__product">

                    </div> */}
                </div>
            </div>
        );
    }
}

export default Product;