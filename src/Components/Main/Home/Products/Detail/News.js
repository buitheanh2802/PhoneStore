import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class News extends Component {
    render() {
        return (
            <Link to='/News/:slug.:id.html'>
                <div>
                    <img src="https://cdn.tgdd.vn/Files/2020/06/02/1260165/1_800x450-300x200.jpg" alt="news" />
                </div>
                <span>
                    Chia sẻ đến bạn các laptop bán chạy nhất tháng 5,
                    tham khảo ngay biết đâu bạn lại tìm được 'bạn đồng hành' chạy deadline cùng
                </span>
            </Link>
        );
    }
}

export default News;