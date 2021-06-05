import React, { Component } from 'react';
import Comment from './Comment';
import Config from './Config';
import Description from './Description';
import News from './News';
import SimilarProduct from '../../SimilarProduct';
import Slider from './Slider';
import firebase from './../../../../../apis/firebaseClient';
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            IDProduct : '',
            renderComment : false,
            isCloseLoader : 'flex',
            pathName : this.props.location.pathname
        }
    }
    componentDidUpdate()
    {
       if(this.state.pathName !== this.props.location.pathname)
       {
        this.setState({isCloseLoader : 'flex'});
        this.setState({pathName : this.props.location.pathname})
        window.scrollTo(0, 0);
        this.getDataFromFirebase();
       }
    }
    //when render it will run
    componentDidMount() {
        //open component sest
        window.scrollTo(0, 0);
        this.getDataFromFirebase();
    }
    uploadView = () =>
    {
        let totalViews = this.state.data.view;
        const postView = firebase.database().ref('Products');
        postView.child(this.state.IDProduct).update({
            view : totalViews + 1
        })
    }
    //create function renderSlider
    renderSlider = (URL) => {
        return firebase.storage().ref(URL)
            .getDownloadURL()
            .then(urlImage => {
                return urlImage;
            });
    }
    //end function

    //create function getdataFormFirebase
    getDataFromFirebase = () => {
        const data = firebase.database().ref('Products');
        data.once('value')
            .then(datasnapshot => {
                let dataFromFirebase = null;
                datasnapshot.forEach(value => {
                    if (Number(this.props.id) === value.val().IDProduct) {
                        dataFromFirebase = value.val();
                        this.setState({IDProduct : value.key});
                    }
                });
                return dataFromFirebase;
            })
            .then(data => {
                this.setState({ data });
                return data;
            })
            .then(data => {
                const arrSlider = [];
                data.sliders.map(value => {
                    return this.renderSlider('Images/Products/' + data.IDProduct + '/SlidesProduct/' + value)
                        .then(data => {
                            arrSlider.push(data);
                        })
                        .then(() => {
                            this.setState({ sliders: arrSlider });
                        }
                        )
                })
                const imageProduct = this.renderSlider('Images/Products/' + data.IDProduct + '/' + data.imageProduct);
                imageProduct.then(data => this.setState({ imageProduct: data }))
                this.renderSlider('Images/Products/' + data.IDProduct + '/' + data.imageProductDetail)
                    .then(data => this.setState({ imageProductDetail: data }))
            })
            .then(() => {
                 this.setState({renderComment : true});
                 this.uploadView();
                 setTimeout(() =>
                 {
                     const loader = document.getElementsByClassName('boxLoaderForHome')[0];
                     loader.classList.add('animationLoader');
                     loader.addEventListener('animationend',() =>
                     {
                        this.setState({isCloseLoader : 'none'});
                        loader.classList.remove('animationLoader');
                     })
                 },1000)
            })
    }
    //end function.....

    //create function formart priceProduct
    formart(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    //end function....

    //create function show contentDetail
     showDetailContent = () =>
     {
         const box = document.getElementsByClassName('detail__extension')[0];
         if(box.clientHeight === 400)
         {
            box.style.height = '100%';
         }
         else
         {
            box.style.height = '400px';
         }
     }
    //End function...
    render() {
        return (
            <div className="detail">
                <div style={{ display: this.state.isCloseLoader }} className="boxLoaderForHome">
                    <div className="lds-dual-ring"></div>
                </div>
                <div className="detail__box">
                    <div className="detail__title">
                        Trang chủ {'\u00A0'} / {'\u00A0'} Sản phẩm {'\u00A0'} / {'\u00A0'} Chi tiết sản phẩm
                    </div>
                    <div className="detail__product">
                        <div className="detail__product-title">
                            {this.state.data.nameProduct}
                        </div>
                        <div className="detail__product-content">
                            <div className="detail__product-boxImage">
                                <img src={this.state.imageProduct} alt="Logo" />
                            </div>
                            <div className="detail__product-description">
                                <div className="detail__product-price">{(this.state.data.price) ? this.formart(this.state.data.price) : null} VNĐ</div>
                                <div className="detail__product-oldPrice">{(this.state.data.oldPrice) ? this.formart(this.state.data.oldPrice) : null} VNĐ</div>
                                <div className="detail__sale">
                                    <img src='https://www.thegioididong.com/Content/desktop/images/V4/game/Gift@2x.png' alt="sale" />
                                    {this.state.data.sale}
                                </div>
                            </div>
                            <div className="detail__product-form">
                                <button>Thêm vào giỏ hàng</button>
                                <button>Quay lại</button>
                            </div>
                        </div>
                        <div className="detail__product-boxDescriptions">
                            <Slider
                            slides = {this.state.sliders}
                            nameProduct = {this.state.data.nameProduct}
                             />
                           {(this.state.data.configProduct) ? <Config data={this.state.data.configProduct} /> : null}
                        </div>
                        <div className="box__extension-news">
                            <Description
                                titleDetail={this.state.data.titleDetail}
                                contentDetail={this.state.data.contentDetail}
                                imageProductDetail={this.state.imageProductDetail}
                            />
                            <div className="news">
                                <div className="news__title">
                                    Tin tức về laptop
                                </div>
                                <div className="news__content">
                                    <News />
                                    <News />
                                    <News />
                                    <News />
                                </div>
                            </div>
                        </div>
                        <button onClick={this.showDetailContent} className="btn__showComment">Đọc tiếp</button>
                        {(this.state.renderComment === true) ? <Comment IDProduct = {this.state.IDProduct} /> : null}
                        {(Object.keys(this.state.data).length !== 0) ? <SimilarProduct trademark = {this.state.data.trademark} firebase = {firebase} IDProduct = {this.state.IDProduct} /> : null}
                    </div>
                </div>
            </div>
        );
    }
}
export default Detail;