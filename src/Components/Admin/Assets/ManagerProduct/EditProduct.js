import React, { Component } from 'react';
import firebase from './../../../../apis/firebaseClient';
import { Link, Redirect } from 'react-router-dom';
class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IDProduct: '',
            nameProduct: '',
            configProduct: '',
            titleDetail: '',
            contentDetail: '',
            imageProduct: '',
            sale: '',
            price: '',
            oldPrice: '',
            trademark: '',
            imageProductDetail: '',
            sliders: [],
            contentLoader: 'Đang cập nhật....',
            isUploadImage: false,
            isUploadImageDetail: false,
            isUploadSlider: false,
            redirect : false,
            displayLoader : 'none'
        }
    }
    componentDidMount() {
        const data = firebase.database().ref('Products');
        data.child(this.props.match.params.id).once('value')
            .then((data) => {
                this.setState({
                    IDProduct: data.val().IDProduct,
                    configProduct: data.val().configProduct,
                    titleDetail: data.val().titleDetail,
                    contentDetail: data.val().contentDetail,
                    imageProduct: data.val().imageProduct,
                    imageProductDetail: data.val().imageProductDetail,
                    nameProduct: data.val().nameProduct,
                    price: data.val().price,
                    oldPrice: data.val().oldPrice,
                    trademark: data.val().trademark,
                    sale: data.val().sale,
                    sliders: data.val().sliders
                });
            })
            .then(() => {
                this.renderImageFromFirebase("imageProductData", "Images/Products/" + this.state.IDProduct + "/" + this.state.imageProduct);
                this.renderImageFromFirebase("imageProductDetailData", "Images/Products/" + this.state.IDProduct + "/" + this.state.imageProductDetail);
                this.renderImageSlidesFromFirebase(this.state.IDProduct, this.state.sliders)
            })
            .then(() => {
                const arrTrademark = [];
                const getTrademark = firebase.database().ref('Categories');
                getTrademark.once('value')
                    .then(datasnapshot => {
                        datasnapshot.forEach(value => {
                            arrTrademark.push(value.val().name);
                        })
                    })
                    .then(() => {
                        this.setState({ totalCategories: arrTrademark })
                    })
            })
    }
    renderImageFromFirebase = (name, URL) => {
        const data = firebase.storage().ref(URL)
        data.getDownloadURL()
            .then(dataImage => {
                this.setState({ [name]: dataImage })
            })
    }
    renderImageSlidesFromFirebase = (IDProduct, arr) => {
        const arrSlider = [];
        arr.forEach(value => {
            const image = firebase.storage().ref('Images/Products/' + IDProduct + '/SlidesProduct/' + value);
            image.getDownloadURL()
                .then(data => {
                    arrSlider.push({ data });
                })
                .then(() => {
                    this.setState({ arrSlider: arrSlider });
                })
        }
        )
    }
    getData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
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
                oldImageProduct: this.state.imageProduct,
                imageProductData: image,
                isUploadImage: true
            })
        }
        else {
            this.setState({
                oldImageProductDetail: this.state.imageProductDetail,
                imageProductDetailData: image,
                isUploadImageDetail: true
            });
        }
        this.setState(
            {
                [name]: image.name,
            }
        )
        this.renderFileDemo(image, indexForRenderDemo);
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
    getSlider = (e) => {
        let parentBoxOfImage = document.getElementsByClassName('totalImage')[2];
        var img = (parentBoxOfImage.getElementsByTagName('img').length > 0) ?
            parentBoxOfImage.getElementsByTagName('img') : null;
        // console.log(img.length);
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
            arrSlider_Data,
            isUploadSlider: true
        })
        // console.log(arrSlider_Data);
    }
    submitForm = () => {
        this.setState({
            newSliders: this.state.sliders,
            displayLoader : 'flex',
        });
        const date = new Date();
        const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
        const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
        const seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
        const day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
        const month = (date.getMonth() + 1 < 10) ? '0' + date.getMonth() + 1 : date.getMonth() + 1;
        const year = date.getFullYear();
        const time = hours + ':' + minutes + ':' + seconds;
        const dayUpdate =  day + '/' + month + '/' + year;
        if (this.state.isUploadImage === true) {
            this.removeImage('Images/Products/' + this.state.IDProduct + '/' + this.state.oldImageProduct);
            this.uploadImageToFirebase('Images/Products/' + this.state.IDProduct + '/' + this.state.imageProduct, this.state.imageProductData);
        }
        if (this.state.isUploadImageDetail === true) {
            this.removeImage('Images/Products/' + this.state.IDProduct + '/' + this.state.oldImageProductDetail);
            this.uploadImageToFirebase('Images/Products/' + this.state.IDProduct + '/' + this.state.imageProductDetail, this.state.imageProductDetailData);
        }
        if (this.state.isUploadSlider === true) {
            this.state.sliders.forEach((value) => {
                this.removeImage('Images/Products/' + this.state.IDProduct + '/SlidesProduct/' + value);
            })
            this.state.arrSlider_Name.forEach((value, key) => {
                this.uploadImageToFirebase('Images/Products/' + this.state.IDProduct + '/SlidesProduct/' + value, this.state.arrSlider_Data[key]);
            })
            this.setState({
                newSliders: this.state.arrSlider_Name
            })
        }
        setTimeout(() => {
            this.setState({contentLoader : 'Cập nhật thành công, đang chuyển hướng....'})
            const startUpdate = firebase.database().ref('Products');
            startUpdate.child(this.props.match.params.id).update({
                nameProduct: this.state.nameProduct,
                imageProduct: this.state.imageProduct,
                imageProductDetail: this.state.imageProductDetail,
                price: this.state.price,
                oldPrice: this.state.oldPrice,
                sale: this.state.sale,
                titleDetail: this.state.titleDetail,
                contentDetail: this.state.contentDetail,
                configProduct: this.state.configProduct,
                sliders: this.state.newSliders,
                trademark: this.state.trademark,
                timeUpdate : time,
                dayUpdate : dayUpdate
            })
                .then(() => {
                    console.log('upload dữ liệu thành công ! ');
                    setTimeout(() =>
                    {
                        this.setState({displayLoader : 'none',redirect : true});
                    },1000)
                })
        },3000)
    }
    removeImage = (URL) => {
        const data = firebase.storage().ref(URL);
        data.delete()
            .then(() => {
                // console.log("delete success !");
            })
    }
    uploadImageToFirebase = (URL, dataBuffer) => {
        const data = firebase.storage().ref(URL);
        data.put(dataBuffer)
            .then(() => {
                // console.log('thêm ảnh thành công !')
            })
    }
    render() {
        if(this.state.redirect === true)
        {
            return <Redirect to = "/Admin/Products" />
        }
        return (
            <div className="addProduct">
                <div style={{ display: this.state.displayLoader }} className="addProduct__loader">
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    <div>{this.state.contentLoader}</div>
                </div>
                <div className="addProduct__title">Sửa sản phẩm </div>
                <div className="addProduct__content">
                    <p>Tên sản phẩm</p>
                    <input type="text" name="nameProduct" defaultValue={this.state.nameProduct} onChange={this.getData} placeholder="Tên sản phẩm...." />
                    <p>Giá hiện tại </p>
                    <input type="text" name="price" defaultValue={this.state.price} onChange={this.getData} placeholder="Nhập giá sản phẩm...." />
                    <p>Giá ban đầu </p>
                    <input type="text" name="oldPrice" defaultValue={this.state.oldPrice} onChange={this.getData} placeholder="Nhập giá ban đầu sản phẩm...." />
                    <p>Hình ảnh sản phẩm</p>
                    <input name="imageProduct" onChange={(e) => this.getImageProduct(e, 0)} hidden id="uploadImageProduct" type="file" />
                    <label htmlFor="uploadImageProduct" ><i style={{ marginRight: '5px' }} className="fa fa-upload" aria-hidden="true"></i> Tải hình ảnh lên......</label>
                    <div className="totalImage">
                        <img src={this.state.imageProductData} alt="Hinh anh san pham...." />
                    </div>
                    <p>Thông tin khuyến mãi</p>
                    <input type="text" name="sale" defaultValue={this.state.sale} onChange={this.getData} placeholder="Nhập nội dung khuyến mãi...." />
                    <p>Tiêu đề chi tiết</p>
                    <input type="text" name="titleDetail" defaultValue={this.state.titleDetail} onChange={this.getData} placeholder="Nhập tiêu đề chi tiết...." />
                    <p>Nội dung chi tiết</p>
                    <textarea name="contentDetail" defaultValue={this.state.contentDetail} onChange={this.getData} placeholder="Nội dung chi tiết"></textarea>
                    <p>Hình ảnh chi tiết </p>
                    <input name="imageProductDetail" onChange={(e) => this.getImageProduct(e, 1)} type="file" hidden id="imageProductDetail" />
                    <label htmlFor="imageProductDetail"><i style={{ marginRight: '5px' }} className="fa fa-upload" aria-hidden="true"></i> Tải hình ảnh lên......</label>
                    <div className="totalImage">
                        <img src={this.state.imageProductDetailData} alt="hinh anh san pham...." />
                    </div>
                    <p>Cấu hình sản phẩm</p>
                    <textarea onChange={this.getConfig} defaultValue={this.state.configProduct} placeholder="Nhập cấu hình sản phẩm, mỗi nội dung phân cách nhau bằng dấu '|'"></textarea>
                    <p>Thương hiệu </p>
                    <select name="trademark" value={this.state.trademark} onChange={this.getData}>
                        <option value="">Chọn thương hiệu</option>
                        {(typeof this.state.totalCategories !== 'undefined') ? this.state.totalCategories.map((value, key) => {
                            return (<option key={key} value={value}>{value}</option>)
                        }) : ''}
                    </select>
                    <p>Slider sản phẩm</p>
                    <input name="sliders" multiple onChange={this.getSlider} type="file" hidden id="slider" />
                    <label htmlFor="slider"><i style={{ marginRight: '5px' }} className="fa fa-upload" aria-hidden="true"></i> Tải hình ảnh lên......</label>
                    <div className="totalImage">
                        {(typeof this.state.arrSlider !== 'undefined') ? this.state.arrSlider.map((value, key) => {
                            return <img key={key} src={value.data} alt="Slider...." />
                        }) : null}
                    </div>
                    <button onClick={this.submitForm}><i style={{ marginRight: '5px' }} className="fa fa-cloud-upload" aria-hidden="true"></i>Cập nhật</button>
                    <Link className="addProduct__close" to="/Admin/Products"><i style={{ marginRight: '5px' }} className="fa fa-times" aria-hidden="true"></i>Quay lại</Link>
                </div>
            </div>
        );
    }
}

export default EditProduct;