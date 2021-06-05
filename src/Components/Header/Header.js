import React, { Component } from 'react';
import LogoWebsite from './Logo/LogoWebsite';
import Nav from './Nav/Nav';
import User from './User/User';
import './Header.css'
class Header extends Component {
    render() {
        return (
            <div className = "header">
                <LogoWebsite />
                <Nav />
                <User />
            </div>
        );
    }
}

export default Header;