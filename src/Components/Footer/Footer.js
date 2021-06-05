import React, { Component } from 'react';
import './Footer.css';
import Logo from './../../imagesStatic/Logo.png'
class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer__description">
                    <div id="boxImage"> <img src={Logo} alt="Logo Website" /></div>
                    <p>BTA.SHOP là nơi mua sắm và quảng bá những mẫu máy tính đang được ưa chuộng và hót nhất hiện nay
                    còn chờ đợi gì nữa hãy tham khảo những mẫu máy tính đáng được sử dụng nhất hiện nay
                    nhanh tay sở hữu cho mình một chiếc laptop ưa thích nhất ở thời điểm hiện tại !
              </p>
                </div>
                <div className="footer__list">
                    <ul>
                        <li>Hỗ trợ</li>
                        <li>giải đáp thắc mắc</li>
                        <li>Câu hỏi thường gặp</li>
                    </ul>
                </div>
                <div className="footer__list">
                    <ul>
                        <li>Blog</li>
                        <li>Phản hồi từ người tương tác</li>
                    </ul>
                </div>
                <form className="footer__login">
                    <p>Nhập email để nhận thông báo mới nhất về những mẫu smartphone sắp tới</p>
                    <input type="text" placeholder="Email của bạn......." />
                    <p />
                    <button>Submit</button>
                </form>
            </footer>
        );
    }
}

export default Footer;