import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class ProductChild extends Component {
    render() {
        return (
            <div className="container__product" >
                <Link style = {{textDecoration : 'none'}} to={'/Detail/' + this.props.slug + '.' + this.props.id + '.html'}>
                    <div className="container__img">
                        <img draggable="false" src={this.props.image} alt="laptop" />
                    </div>
                    <div className="container__title">{this.props.name}</div>
                    <div className="container__price">{this.props.price} VNĐ</div>
                    <div className="container__oldPrice">{this.props.oldPrice} VNĐ</div>
                    <div className="container__config">
                        <span>{this.props.screen}</span>
                        <span>{this.props.CPU}</span>
                        <span>{this.props.graphics}</span>
                        <span>{this.props.curent}</span>
                        <span>{this.props.weight}</span>
                    </div>
                    <div className="container__comment">
                        <div>
                            <span style={{ marginRight: '5px' }}><i className="fa fa-eye" aria-hidden="true"></i></span>
                            <span>{this.props.views}</span> lượt xem
                    </div>
                        <div>
                            <span style={{ marginRight: '5px' }}><i className="fa fa-comments" aria-hidden="true"></i></span>
                            <span>{(this.props.totalComment === 0) ? 0 : this.props.totalComment.length}</span> bình luận
                    </div>
                    </div>
                </Link>
                <div className="container__btn">
                    <Link to={'/Detail/' + this.props.slug + '.' + this.props.id + '.html'} >Chi tiết</Link>
                    <button>Thêm vào giỏ hàng</button>
                </div>
            </div>
        );
    }
}

export default ProductChild;