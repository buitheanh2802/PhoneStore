import React, { Component } from 'react';
import Card from './Products/Product/ProductChild';
class SimilarProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            similarProduct: []
        }
    }
    componentDidMount() {
        const getData = this.props.firebase.database().ref('Products')
        getData.once('value')
            .then(data => {
                const totalProduct = [];
                data.forEach(value => {
                    const obj = {};
                    obj.dataProduct = value.val();
                    obj.idProduct = value.key;
                    totalProduct.push(obj);
                });
                const newArrProducts = totalProduct.filter(value => {
                    return value.dataProduct.trademark === this.props.trademark && value.idProduct !== this.props.IDProduct
                });
               this.setState({ similarProduct : newArrProducts});
            })
    }
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
    formart = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    rendersimilarProduct = () => {
        //total product = data.length
        //số sản phẩm mới muốn lấy = 4 (sản phẩm mới được cập nhật after)
        // => ex : map (0) else length => 1
        // const newProducts = this.state.data.length - 4;
        return this.state.similarProduct.map((value, key) => {
            if (key < this.state.similarProduct.length && key < 4) {
                return (
                    <Card
                        oldPrice={this.formart(value.dataProduct.oldPrice)}
                        weight={value.dataProduct.configProduct[8]}
                        CPU={value.dataProduct.configProduct[0]}
                        graphics={value.dataProduct.configProduct[6]}
                        screen={value.dataProduct.configProduct[3]}
                        price={this.formart(value.dataProduct.price)}
                        image={'https://firebasestorage.googleapis.com/v0/b/node-reactjs.appspot.com/o/Images%2FProducts%2F8637%2Flenovo-ideapad-s340-14iil-i5-1035g1-8gb-512gb-win1-8-214708-2-600x600.jpg?alt=media&token=0d68ba62-4e92-4aee-90a1-7c0c8db1585d'}
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
    render() {
        return (
            <div className="similarProduct">
                <div className="similarProduct__title">
                    Sản phẩm tương tự
                </div>
                <div className="similarProduct__box">
                   {(this.state.similarProduct.length > 0 ) ? this.rendersimilarProduct() : <center>Chưa có sản phẩm liên quan nào </center>}
                </div>
            </div>
        );
    }
}

export default SimilarProduct;