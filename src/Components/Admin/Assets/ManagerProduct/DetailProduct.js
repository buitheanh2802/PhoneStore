import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from './../../../../apis/firebaseClient';
class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageURL: '',
            hideSlider: 'block'
        }
    }
    closeInfo = () =>
    {
         ReactDOM.unmountComponentAtNode(document.getElementsByClassName('dataRender')[this.props.id]);
    }
    componentDidMount() {
        let data = firebase.storage().ref('Images/Products/'+this.props.product.data.IDProduct);
        data.child(this.props.product.data.imageProduct).getDownloadURL()
            .then(dataURL => {
                this.setState({
                    imageURL: dataURL
                })
            })
            .then(() => {
                setTimeout(() => {
                    this.setState({
                        hideSlider: 'none'
                    })
                }, 1000)
            })
    }
    formart(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render() {
        return (
            <div className="managerProduct__detail">
                <div style={{ display: this.state.hideSlider }} className="managerProduct__detail-loader">
                    <div><div></div></div>
                    <div>
                        <div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div className="managerProduct__detail-title">Thông tin sản phẩm</div>
                <div className="managerProduct__detail-content">
                    <div>
                        <p><label>Tên sản phẩm : </label><span>{this.props.product.data.nameProduct}</span></p>
                        <p><label>Giá sản phẩm : </label>
                            <span style={{ color: 'red', fontWeight: '500', fontSize: '15px' }}>{this.formart(this.props.product.data.price)} VNĐ</span>
                        </p>
                        <p><label>Giá gốc : </label>
                            <span style={{ color: '#505050', fontSize: '15px', textDecoration: 'line-through' }}>
                                {this.formart(this.props.product.data.oldPrice)} VNĐ
                            </span>
                        </p>
                        <p><label>Khuyến mãi : </label>
                            <span style={{ fontSize: '14px' }}>
                                {this.props.product.data.sale}
                            </span></p>
                        <p><label>Thương hiệu : </label>
                            <span>{this.props.product.data.trademark.toUpperCase()}</span>
                        </p>
                        <p><label>Tiêu đề chi tiết : </label><span>{this.props.product.data.titleDetail}</span></p>
                        <p><label>Nội dung chi tiết : </label>
                            <span style={{ fontSize: '14px' }}>
                                {this.props.product.data.contentDetail}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p>Hình ảnh sản phẩm</p>
                        <div style={{ display: 'flex' }}>
                            <img src={this.state.imageURL} alt="Hình ảnh sản phẩm" />
                        </div>
                        <div style={{ width: '100%', textAlign: 'center', color: '#5a5a5a', marginTop: '7%' }}><i className="fa fa-eye" style={{ marginRight: '5px' }} aria-hidden="true"></i>Lượt xem : {this.props.product.data.view}</div>
                        <div style={{ width: '100%', textAlign: 'center', color: '#5a5a5a' }}>
                            <i className="fa fa-comments" style={{ marginRight: '5px' }} aria-hidden="true"></i>Lượt bình luận :
                             {(this.props.product.data.commentBy) ? this.props.product.data.commentBy.length : 0}
                        </div>
                    </div>
                </div>
                <div className="managerProduct__Detail-button">
                    <button onClick = {this.closeInfo} ><i style={{ marginRight: '5px' }} className="fa fa-times" aria-hidden="true"></i>Đóng lại</button>
                </div>
            </div>
        );
    }
}

export default DetailProduct;