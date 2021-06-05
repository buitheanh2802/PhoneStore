import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from './../../../../apis/firebaseClient';
class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: [],
            contentLoader: '',
            displayLoader : 'none',
            redirect : false
        }
    }
    componentDidMount() {
        const arrSelect = [];
        const loadSelect = firebase.database().ref('Categories');
        loadSelect.once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(value => {
                    arrSelect.push(value.val());
                })
            })
            .then(() => {
                this.setState(
                    {
                        select: arrSelect
                    }
                )
            })
    }
    getDataFromInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(
            {
                [name]: value
            }
        )
    }
    getSlider = (e) => {
        let parentBoxOfImage = document.getElementsByClassName('totalImage')[2];
        var img = (parentBoxOfImage.getElementsByTagName('img').length > 0) ?
            parentBoxOfImage.getElementsByTagName('img') : null;
        if (img !== null) {
            let i = 0;
            while (true) {
                if (i >= img.length) {
                    // console.log('đã thoát');
                    break;
                }
                else {
                    img[i].remove();
                }
            }
        }
        const sliders = e.target.files;
        const arrSlider_Name = [];
        let arrSlider_Data = [];
        for (let i = 0; i < sliders.length; i++) {
            arrSlider_Name.push(sliders[i].name);
            arrSlider_Data.push(sliders[i]);
            this.renderFileDemo(sliders[i], 2);
        }
        this.setState({
            arrSlider_Name,
            arrSlider_Data
        })
        // console.log(arrSlider_Name);
        // console.log(arrSlider_Data);
    }
    getImageProduct = (e, indexForRenderDemo) => {
        const parent = document.getElementsByClassName('totalImage')[indexForRenderDemo];
        const img = (parent.getElementsByTagName('img').length > 0) ? parent.getElementsByTagName('img') : null;
        if (img !== null) {
            for (let i = 0; i < img.length; i++) {
                parent.removeChild(img[i]);
            }
        }
        let name = e.target.name
        let image = e.target.files[0];
        if (indexForRenderDemo === 0) {
            this.setState({
                imageProductData: image
            })
        }
        else {
            this.setState({
                imageProductDetailData: image
            })
        }
        this.setState(
            {
                [name]: image.name,
            }
        )
        this.renderFileDemo(image, indexForRenderDemo);
    }
    getConfig = (data) => {
        let config = data.target.value.trim();
        let arrConfig = config.split("\n");
        this.setState(
            {
                configProduct: arrConfig
            }
        )
    }
    renderFileDemo = (e, index) => {
        const parent = document.getElementsByClassName('totalImage')[index];
        let fileRender = new FileReader();
        fileRender.readAsDataURL(e);
        fileRender.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = "ImageForProduct";
            parent.appendChild(img);
        }
    }
    submitForm = () => {
        const date = new Date();
        const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
        const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
        const seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
        const day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
        const month = (date.getMonth() + 1 < 10) ? '0' + date.getMonth() + 1 : date.getMonth() + 1;
        const year = date.getFullYear();
        const timeUpdate = hours + ':' + minutes + ':' + seconds;
        const dayUpdate =  month + '/' + day + '/' + year;
        this.setState({contentLoader : 'Đang thêm sản phẩm.....',displayLoader : 'flex'})
        let randID = Math.floor(Math.random() * 10000);
        const data = {};
        data.IDProduct = randID;
        data.nameProduct = this.state.nameProduct;
        data.configProduct = this.state.configProduct;
        data.titleDetail = this.state.titleDetail;
        data.contentDetail = this.state.contentDetail;
        data.imageProduct = this.state.imageProduct;
        data.view = 0;
        data.sale = this.state.sale;
        data.price = this.state.priceProduct;
        data.oldPrice = this.state.oldPrice;
        data.trademark = this.state.tradeMark;
        data.imageProductDetail = this.state.imageProductDetail;
        data.sliders = this.state.arrSlider_Name;
        data.timeUpdate = timeUpdate;
        data.dayUpdate = dayUpdate;
        const postDataToFirebase = firebase.database().ref('Products');
        postDataToFirebase.push(data)
            .then(() => {
                const postImageToStorage = firebase.storage().ref('Images/Products/' + data.IDProduct + '/' + this.state.imageProduct);
                postImageToStorage.put(this.state.imageProductData);
                const postImageDetailToStorage = firebase.storage().ref('Images/Products/' + data.IDProduct + '/' + this.state.imageProductDetail);
                postImageDetailToStorage.put(this.state.imageProductDetailData)
                    .then(() => {
                        this.setState({
                            contentLoader : 'Thêm sản phẩm thành công , đang chuyển hướng.....'   
                        })
                        setTimeout(() =>
                        {
                           this.setState({redirect : true})
                        },1000)
                    })
                for (let i = 0; i < this.state.arrSlider_Name.length; i++) {
                    let slideImage = firebase.storage().ref('Images/Products/' + data.IDProduct + '/SlidesProduct/' + this.state.arrSlider_Name[i]);
                    slideImage.put(this.state.arrSlider_Data[i])
                }
            })
            .then(() => {
                // console.log("Thêm dữ liệu thành công !.....");
            })
    }
    render() {
        if(this.state.redirect === true)
        {
            return <Redirect to = "/Admin/Products" />
        }
        return (
            <div className="addProduct">
                <div style = {{display : this.state.displayLoader}} className="addProduct__loader">
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    <div>{this.state.contentLoader}</div>
                </div>
                <div className="addProduct__title">Thêm sản phẩm</div>
                <div className="addProduct__content">
                    <p>Tên sản phẩm</p>
                    <input type="text" name="nameProduct" onChange={this.getDataFromInput} placeholder="Tên sản phẩm...." />
                    <p>Giá hiện tại </p>
                    <input type="text" name="priceProduct" onChange={this.getDataFromInput} placeholder="Nhập giá sản phẩm...." />
                    <p>Giá ban đầu </p>
                    <input type="text" name="oldPrice" onChange={this.getDataFromInput} placeholder="Nhập giá ban đầu sản phẩm...." />
                    <p>Hình ảnh sản phẩm</p>
                    <input name="imageProduct" onChange={(e) => this.getImageProduct(e, 0)} hidden id="uploadImageProduct" type="file" />
                    <label htmlFor="uploadImageProduct" ><i style={{ marginRight: '5px' }} className="fa fa-upload" aria-hidden="true"></i> Tải hình ảnh lên......</label>
                    <div className="totalImage">

                    </div>
                    <p>Thông tin khuyến mãi</p>
                    <input type="text" name="sale" onChange={this.getDataFromInput} placeholder="Nhập nội dung khuyến mãi...." />
                    <p>Tiêu đề chi tiết</p>
                    <input type="text" name="titleDetail" onChange={this.getDataFromInput} placeholder="Nhập tiêu đề chi tiết...." />
                    <p>Nội dung chi tiết</p>
                    <textarea name="contentDetail" onChange={this.getDataFromInput} placeholder="Nội dung chi tiết"></textarea>
                    <p>Hình ảnh chi tiết </p>
                    <input name="imageProductDetail" onChange={(e) => this.getImageProduct(e, 1)} type="file" hidden id="imageProductDetail" />
                    <label htmlFor="imageProductDetail"><i style={{ marginRight: '5px' }} className="fa fa-upload" aria-hidden="true"></i> Tải hình ảnh lên......</label>
                    <div className="totalImage">

                    </div>
                    <p>Cấu hình sản phẩm</p>
                    <textarea onChange={this.getConfig} placeholder="Nhập cấu hình sản phẩm, mỗi nội dung phân cách nhau bằng dấu '|'"></textarea>
                    <p>Thương hiệu </p>
                    <select name="tradeMark" onChange={this.getDataFromInput}>
                        <option>Chọn thương hiệu</option>
                        {this.state.select.map((elm, key) => {
                            return (<option key={key} value={elm.name}>{elm.name.toUpperCase()}</option>)
                        })}
                    </select>
                    <p>Slider sản phẩm</p>
                    <input name="sliders" multiple onChange={this.getSlider} type="file" hidden id="slider" />
                    <label htmlFor="slider"><i style={{ marginRight: '5px' }} className="fa fa-upload" aria-hidden="true"></i> Tải hình ảnh lên......</label>
                    <div className="totalImage">

                    </div>
                    <button onClick={this.submitForm}><i style = {{marginRight : '5px'}} className="fa fa-cloud-upload" aria-hidden="true"></i>Upload</button>
                    <Link className = "addProduct__close" to = "/Admin/Products"><i style = {{marginRight : '5px'}} className="fa fa-times" aria-hidden="true"></i>Quay lại</Link>                
                </div>
            </div>
        );
    }
}

export default AddProduct;