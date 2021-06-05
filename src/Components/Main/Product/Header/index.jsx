import React from 'react';
import { Link } from 'react-router-dom';
import Search from './../Search/Search';
function header(props) {
    return (
        <div className="detail__title">
           <div>
            <Link to = '/'>Trang chủ</Link> {'\u00a0'} / {'\u00a0'}
            <Link to = 'Products'>Tất cả sản phẩm </Link>{'\u00a0'}
           </div>
           <Search />
        </div>
    );
}

export default header;