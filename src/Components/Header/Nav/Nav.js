import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Nav extends Component {
    render() {
        return (
            <div className="nav">
                <ul className="nav__list">
                    <li className = "nav__item">
                        <Link title = "Home" to = "/" className = "nav__link">TRANG CHỦ</Link>
                    </li>
                    <li className = "nav__item">
                        <Link title = "About" to = "/About" className = "nav__link">GIỚI THIỆU</Link>
                    </li>
                    <li className = "nav__item">
                        <Link title = "Product" to = "/Products" className = "nav__link">SẢN PHẨM</Link>
                    </li>
                    <li className = "nav__item">
                        <Link title = "News" to = "/News" className = "nav__link">TIN TỨC</Link>
                    </li>
                </ul>
            </div>
        );
    }
}
export default Nav;

