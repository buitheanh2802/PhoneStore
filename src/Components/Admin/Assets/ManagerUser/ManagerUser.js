import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from './../../../../apis/firebaseClient';
import Edit from './Edit';
import Delete from './Delete';
// import { Link } from 'react-router-dom';
class ManagerUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: 'flex',
            preload: false,
            closeFormEdit: 0,
            data: [],
            dataSearch: ''
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.getDataFromFirebase();
    }
    changePreload = (e) => {
        this.setState({
            preload: e
        })
    }
    editContent = (value, key) => {
        ReactDOM.unmountComponentAtNode(document.getElementsByClassName('editForm')[this.state.closeFormEdit]);
        ReactDOM.render(<Edit changePreload={(e) => this.changePreload(e)} user={value} id={key} />, document.getElementsByClassName('editForm')[key]);
        this.setState({
            closeFormEdit: key
        })
    }
    deleteContent = (value, key) => {
        ReactDOM.render(<Delete id={key} changePreload={(e) => this.changePreload(e)} user={value} />, document.getElementsByClassName('editForm')[key]);
    }
    getDataFromFirebase = () => {
        const data = firebase.database().ref('Users');
        const arr = [];
        data.once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(value => {
                    const obj = {};
                    obj.data = value.val();
                    obj.key = value.key
                    arr.push(obj);
                })
            })
            .then(() => {
                setTimeout(() => {
                    this.setState({
                        data: arr,
                        loader: 'none',
                        preload: false
                    });
                }, 800)
            })
    }
    searchData = (event) => {
        let dataSearch = event.target.value;
        dataSearch = dataSearch.toLowerCase();
        let table = document.getElementsByClassName('table')[0];
        let div = table.getElementsByClassName('table__Childrent');
        console.log(dataSearch);
        for (let i = 0; i < div.length; i++) {
            let p = div[i].getElementsByTagName('p')[1].innerHTML;
            if (p.toLowerCase().indexOf(dataSearch) !== -1) {
                div[i].style.display = 'flex';
            }
            else {
                div[i].style.display = 'none';
            }
        }
    }
    render() {
        if (this.state.preload === true) {
            this.getDataFromFirebase();
        }
        return (
            <div className="user">
                <div style = {{display : this.state.loader}} className='loaderForManagerUser'>
                    <div style = {{paddingTop : 0}} className="lds-dual-ring"></div>
                </div>
                {/* <div className="user__search">
                    <form>
                        <i style={{ position: 'unset', margin: '0px 5px', transform: 'translateY(4px)', color: '#858585' }} className="fa fa-filter" aria-hidden="true"></i>
                        <input onChange={this.searchData} type="text" placeholder="Nh???p n???i dung t??m ki???m...." />
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </form>
                    <div>
                        <Link to="/Admin/Dashboard"><i style={{ marginRight: '5px' }} className="fa fa-sign-out" aria-hidden="true"></i>Quay l???i</Link>
                    </div>
                </div> */}
                <div className="table">
                    <div>
                        <p style={{ width: "10%", textAlign: 'center' }}>STT</p>
                        <p style={{ width: "18%",fontWeight : '500'}}>H??? v?? t??n</p>
                        <p style={{ width: "13%" }}>Gi???i t??nh</p>
                        <p style={{ width: "14%" }}>Ng??y sinh</p>
                        <p style={{ width: "15%" }}>S??? ??i???n tho???i</p>
                        <p style={{ width: "10%" }}>Ph??n lo???i</p>
                        <p style={{ width: "20%" }}>H??nh ?????ng</p>
                    </div>
                    {(typeof this.state.data !== 'undefined') ? this.state.data.map((value, key) => {
                        let permission = 'Th??nh vi??n';
                        if (value.data.isManager) {
                            permission = 'Qu???n tr???';
                        }
                        return (<div className="table__Childrent" key={key}>
                            <p style={{ width: "10%", textAlign: 'center' }}>{key + 1}</p>
                            <p style={{ width: "18%" ,fontWeight : '500'}}>{value.data.name}</p>
                            <p style={{ width: "13%" }}>{value.data.gender}</p>
                            <p style={{ width: "14%" }}>{value.data.dateOfBirth}</p>
                            <p style={{ width: "15%" }}>{value.data.phoneNumber}</p>
                            <p style={{ width: "10%" }}>{permission}</p>
                            <p style={{ width: "20%" }}>
                                <button onClick={() => this.editContent(value, key)}>
                                    <i style={{ marginRight: '5px' }} className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                        S???a
                                </button>
                                <button onClick={() => this.deleteContent(value, key)}>
                                    <i style={{ marginRight: '5px' }} className="fa fa-trash-o" aria-hidden="true"></i>
                                        X??a
                                </button>
                            </p>
                            <div style={{ width: '100%' }} className="editForm">
                            </div>
                        </div>)
                    }) : null}
                </div>
            </div>
        );
    }
}

export default ManagerUser;