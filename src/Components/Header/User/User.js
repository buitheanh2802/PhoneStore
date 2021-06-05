import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preload: false
        }
    }
    // componentDidMount() {
    //     window.onclick = () => {
    //         const checkbox = document.getElementById('toggleOption');
    //         if (checkbox.checked) checkbox.click();
    //     }
    // }
    // componentWillUnmount()
    // {
    //     window.onclick = () => {
          
    //     }
    // }
    logOut = () => {
        if (sessionStorage.getItem('user')) {
            sessionStorage.clear();
            this.props.sessionUser(false);
            this.setState({
                preload: true
            })
        }
        return null;
    }
    handleShowInfo = () => {
        if (this.props.issetUser || sessionStorage.getItem('user')) {
            if (sessionStorage.getItem('user')) {
                const dataOfUser = JSON.parse(sessionStorage.getItem('user'));
                return (
                    <div className='user__info'>
                        <div className='info'>
                            <p>{dataOfUser.name}</p>
                            <p>{dataOfUser.email}</p>
                        </div>
                        <div className='cart'>
                            <i className='fa fa-shopping-cart' aria-hidden='true'></i>
                        </div>
                        <div className='bell'>
                            <i className='fa fa-bell' aria-hidden='true'></i>
                        </div>
                        <div className='listForUser'>
                            <label htmlFor='toggleOption' style={{ margin: 0, padding: '0px 20px', marginTop: '3px' }} className='fa fa-sort-desc' aria-hidden='true'></label>
                        </div>
                        <input hidden type='checkbox' id='toggleOption' />
                        <ul className='select'>
                            {(dataOfUser.isManager) ?
                                <li className='select-item'>
                                    <i className='fa fa-user' aria-hidden='true'></i>
                                    <Link to='/Admin/Dashboard' >Quản trị viên</Link>
                                </li> : null}
                            <li onClick={this.logOut} className='select-item'>
                                <i className='fa fa-sign-out' aria-hidden='true'></i>
                                    Đăng xuất
                                </li>
                        </ul>
                    </div>
                )
            }
        }
        else {
            return (
                <div className='user' style={{ marginTop: '0px', minHeight: 'auto' }}>
                    <ul className='nav__list'>
                        <li className='nav__item'>
                            <Link to='/Login' className='nav__link'>Đăng nhập</Link>
                        </li>
                        <li className='nav__item'>
                            <Link to='/Register' className='nav__link'>Đăng kí</Link>
                        </li>
                    </ul>
                </div>
            )
        }
        return null;
    }
    render() {
        if (this.props.issetUser || this.props.issetUser === false || this.state.preload === true) {
            return this.handleShowInfo();
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        issetUser: state.issetUser
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sessionUser: (flag) => {
            dispatch(
                {
                    type: 'CHANE__ISSETUSER',
                    flag
                }
            )
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(User)