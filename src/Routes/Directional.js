import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Components/Main/Login/Login';
import About from '../Components/Main/About/About';
import Home from '../Components/Main/Home/Home';
import News from '../Components/Main/News/News';
import Product from '../Components/Main/Product/Product';
import Register from '../Components/Main/Register/Register';
import Detail from '../Components/Main/Home/Products/Detail/Detail';
// import Admin from '../Components/Admin/Admin';
import NotFound from '../Components/Main/NotFound/NotFound';
import { connect } from 'react-redux';
// import NotFound from '../Components/Main/NotFound/NotFound';
class Directional extends Component {
    // showAdmin = () => {
    //     if (sessionStorage.getItem('user')) {
    //         let data = JSON.parse(sessionStorage.getItem('user'));
    //         if (data.manager) {
    //             return (<Route path="/Admin" component={Admin} />)
    //         }
    //         else {
    //             return null;
    //         }
    //     }
    // }
    render() {
        return (
            <div className="main">
                <Switch>
                    <Route path="/Detail/:slug.:id.html" render={(props) => (
                        <Detail id = {props.match.params.id} {...props} />)
                    } />
                    {/* <Route path="/Detail/:slug.:id.html" component={Detail} exact /> */}
                    <Route path="/About" component={About} />
                    <Route path="/News" component={News} />
                    <Route path="/Products" component={Product} />
                    <Route path="/Login" component={Login} />
                    <Route path="/Register" component={Register} />
                    <Route exact path="/" component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        onLoad: state.issetUser
    }
}
export default connect(mapStateToProps)(Directional)