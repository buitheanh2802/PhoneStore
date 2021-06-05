import React, { Component } from 'react';
import { Switch, Route, NavLink, Link } from 'react-router-dom';
import firebase from './../../apis/firebaseClient';
import NotFound from './../Main/NotFound/NotFound';
import './Admin.css';
import ManagerProducts from './Assets/ManagerProduct/ManagerProducts';
import Dashboard from './Assets/ManagerDashboard/Dashboard';
import ManagerUser from './Assets/ManagerUser/ManagerUser';
import AddProduct from './Assets/ManagerProduct/AddProduct';
import EditProduct from './Assets/ManagerProduct/EditProduct';
import ManagerCategories from './Assets/ManagerCategories/ManagerCategories';
import ManagerComments from './Assets/ManagerComments/ManagerComments';
class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            display: 'none',
            imageManager: '',
            URL: 'Dashboard'
        }
    }
    toggleForm = () => {
        if (this.state.display === 'none') {
            this.setState({
                display: 'block'
            })
        }
        else {
            this.setState({
                display: 'none'
            })
        }
    }
    getUrl = (e) => {
        let URL = e.target.href.split('/');
        this.setState({
            URL: URL[4]
        })
    }
    componentDidMount() {
        const dataOfManager = JSON.parse(sessionStorage.getItem('user'));
        this.setState({
            data: dataOfManager
        });
        this.setState({
            display: 'none'
        });
        let getDataUrl = firebase.storage().ref('Images/Users');
        getDataUrl.child(dataOfManager.image).getDownloadURL()
            .then((data) => {
                this.setState(
                    {
                        imageManager: data
                    }
                )
            })
        window.scrollTo(0, 0);
    }
    render() {
        if(document.getElementById('imageForManager'))
        {
           if(document.getElementById('imageForManager').complete === true)
           {
               document.getElementsByClassName('loaderForAdmin')[0].style.display = 'none';
           }
        }
        return (
            <div className="admin">
                <div className="admin__box">
                    <div className="admin__content">
                        <div className="admin__sidebar">
                            <div style={{ margin: 'auto 0px' }} className="logo logoForAdmin">
                                <div>B</div>
                                <div>T</div>
                                <div>A</div>
                                <div>.</div>
                                <div>S</div>
                                <div>H</div>
                                <div>O</div>
                                <div>P</div>
                            </div>
                            <ul>
                                <li>
                                    <NavLink onClick={this.getUrl} activeClassName="activeSelected" to="/Admin/Dashboard" >
                                        <i className="fa fa-tachometer" aria-hidden="true"></i>
                                       Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={this.getUrl} activeClassName="activeSelected" to="/Admin/User" >
                                        <i className="fa fa-folder" aria-hidden="true"></i>
                                        Quản lí người dùng
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={this.getUrl} activeClassName="activeSelected" to="/Admin/Products" >
                                        <i className="fa fa-folder" aria-hidden="true"></i>
                                        Quản lí sản phẩm
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={this.getUrl} activeClassName="activeSelected" to="/Admin/Categories" >
                                        <i className="fa fa-folder" aria-hidden="true"></i>
                                        Quản lí danh mục
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={this.getUrl} activeClassName="activeSelected" to="/Admin/Comments" >
                                        <i className="fa fa-folder" aria-hidden="true"></i>
                                        Quản lí bình luận
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="admin__config">
                            <div className='admin__header-link'>
                                <div className='admin__link'>
                                    <i className="fa fa-home" aria-hidden="true"></i> / {this.state.URL}
                                </div>
                                <div className="admin__user">
                                    <div className='loaderForAdmin'>
                                        <div className="lds-ellipsis changeEllip"><div></div><div></div><div></div><div></div></div>
                                    </div>
                                    <div style={{ paddingRight: '0px' }}>
                                        <img id='imageForManager' src={this.state.imageManager} alt="profile" />
                                    </div>
                                    <div>
                                        <p>{this.state.data.name}</p>
                                        <p>{this.state.data.email}</p>
                                    </div>
                                    <div>
                                        <i className="fa fa-bell" aria-hidden="true"></i>
                                    </div>
                                    <div>
                                        <i onClick={this.toggleForm} className="fa fa-cog" aria-hidden="true"></i>
                                    </div>
                                    <ul style={{ display: this.state.display }} className="admin__user-list">
                                        <li>
                                            <Link to="/"><i style={{ marginRight: '5px' }} className="fa fa-sign-out" aria-hidden="true"></i>Quay trở lại website</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <Switch>
                                {/* <Route path="/Admin/Products/addProduct" component={AddProduct} />
                                <Route path="/Admin/Products/allProducts" component={AllProducts} /> */}
                                <Route path="/Admin/Categories" component={ManagerCategories} />
                                <Route path="/Admin/Comments" component={ManagerComments} />
                                <Route path="/Admin/Dashboard" component={Dashboard} />
                                <Route path="/Admin/User" component={ManagerUser} />
                                <Route path="/Admin/Products/AddProduct" component={AddProduct} />
                                <Route path="/Admin/Products/EditProduct/:id.html" component={EditProduct} />
                                <Route path="/Admin/Products" component={ManagerProducts} />
                                <Route exact path="/Admin" component={Dashboard} />
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </div>
                    <div className="admin__owned">
                        Bản quyền thuộc về Bùi Thế Anh
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;
