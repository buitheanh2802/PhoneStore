import React, { Component } from 'react';
import firebase from './../../../apis/firebaseClient';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Login.css'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRedirect: false,
            resultData: 'Đang đăng nhập....',
            inCorectPassword: ''
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    getDataFromInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }
    submitForm = () => {
        let flag = false;
        let data = {}
        const getDataToFirebase = firebase.database().ref('Users');
        document.getElementsByClassName('loaderForLogin')[0].style.display = 'flex';
        getDataToFirebase.once('value')
            .then(dataSnapshot => {
                dataSnapshot.forEach(value => {
                    if (value.val().email === this.state.email && value.val().password === this.state.password) {
                        flag = true;
                        data.user = value.val();
                        data.id = value.key;
                    }
                });
                return { flag, data };
            })
            .then((snapshot) => {
                setTimeout(() => {
                    if (snapshot.flag === false) {
                        document.getElementsByClassName('loaderForLogin')[0].style.display = 'none';
                        this.setState(
                            {
                                inCorectPassword: 'Error : Thông tin tài khoản hoặc mật khẩu không chính xác !'
                            }
                        )
                    }
                    else {
                        this.setState({
                            resultData: 'Đăng nhập thành công...'
                        });
                        setTimeout(() => {
                            this.setState({
                                resultData: 'Đang chuyển hướng...'
                            });
                            setTimeout(() => {
                                document.getElementsByClassName('loaderForLogin')[0].style.display = 'none';
                                const data = JSON.stringify(snapshot.data.user);
                                sessionStorage.setItem('user', data);
                                sessionStorage.setItem('id',snapshot.data.id);
                                this.props.sessionUser(true);
                                this.setState({
                                    isRedirect: true
                                })
                            }, 1000)
                        }, 2000)
                    }
                }, 3000);
            })
    }
    render() {
        if (this.state.isRedirect) {
            return <Redirect to="/" />
        }
        return (
            <div className="box">
                <div className="loaderForLogin" style = {{display : 'none'}}>
                    <div style={{ paddingTop: 0 ,width : '70px',height : '70px'}} className="lds-dual-ring"></div>
                    <div>{this.state.resultData}</div>
                </div>
                <form autoComplete="off" className="login">
                    <p className="title">Email</p>
                    <input onChange={this.getDataFromInput} className="input" name="email" type="text" placeholder="Nhập email của bạn...." />
                    <p className="title">Mật khẩu</p>
                    <input onChange={this.getDataFromInput} className="input" name="password" type="password" placeholder="Nhập mật khẩu của bạn...." />
                    <p style={{ color: 'red', fontSize: '15px' }}>{this.state.inCorectPassword}</p>
                    <button onClick={this.submitForm} type="button" className="btn__submit-login">Đăng nhập</button>
                    <p className="helper">Nếu chưa có tài khoản vui lòng <Link to="/Register" >Đăng kí</Link></p>
                </form>
            </div>
        )
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
export default connect(null, mapDispatchToProps)(Login)
