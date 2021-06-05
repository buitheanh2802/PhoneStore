import React, { Component } from 'react';
import firebase from './../../../../apis/firebaseClient';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state =
        {

        }
    }
    componentDidMount() {
        this.startCounter(0);
    }
    startCounter = (indexDocument) =>
    {
        let data = firebase.database().ref('Users');
        let counter = 0;
        data.once('value').then(datasnapshot => {
            datasnapshot.forEach((value,key) => {
                     counter++;
            })
        })
        .then(() =>
        {
            let startCounter = {
                start: 0,
                end: counter
            }
            let boxCouter = document.getElementsByClassName('dashboard__header-content')[indexDocument];
            let p = boxCouter.getElementsByTagName('p')[1];
            let run = setInterval(() => {
                if (startCounter.start === startCounter.end) {
                    clearInterval(run);
                }
                else {
                    p.innerHTML = startCounter.start += 1;
                }
            }, 50)
        })
    }
    render() {
        return (
            <div className="dashboard">
                <div className="dashboard__header">
                    <div className="dashboard__header-box">
                        <div className="dashboard__header-icon">
                            <i className="fa fa-users" aria-hidden="true"></i>
                        </div>
                        <div className="dashboard__header-content">
                            <p>Tài khoản đăng kí</p>
                            <p>0</p>
                        </div>
                    </div>
                    <div style={{ background: '#565656' }} className="dashboard__header-box">
                        <div style={{ background: '#565656' }} className="dashboard__header-icon">
                            <i style={{ color: 'white' }} className="fa fa-thumbs-up" aria-hidden="true"></i>
                        </div>
                        <div className="dashboard__header-content">
                            <p style={{ color: 'white' }}>Lượt thích</p>
                            <p style={{ color: 'white' }}>0</p>
                        </div>
                    </div>
                    <div style={{ background: '#007bff' }} className="dashboard__header-box">
                        <div style={{ background: '#007bff' }} className="dashboard__header-icon">
                            <i style={{ color: 'white' }} className="fa fa-eye" aria-hidden="true"></i>
                        </div>
                        <div className="dashboard__header-content">
                            <p style={{ color: 'white' }}>Lượt xem trang </p>
                            <p style={{ color: 'white' }}>0</p>
                        </div>
                    </div>
                    <div style={{ background: 'rgb(40, 167, 69)' }} className="dashboard__header-box">
                        <div style={{ background: 'rgb(40, 167, 69)' }} className="dashboard__header-icon">
                            <i style={{ color: 'white' }} className="fa fa-heart" aria-hidden="true"></i>
                        </div>
                        <div className="dashboard__header-content">
                            <p style={{ color: 'white' }}>Lượt yêu thích</p>
                            <p style={{ color: 'white' }}>0</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;