import React, { Component } from 'react';
import Banner from './Banner/Banner';
import './Home.css';
import Product from './Products/Product';
class Home extends Component {
    componentDidMount()
    {
        window.scrollTo(0,0);
    }
    render() {
        return (
            <div className = "home">
                <Banner />
                <Product />
            </div>
        );
    }
}

export default Home;