import React from 'react';
import Header from './Header/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Directional from '../Routes/Directional';
import Footer from './Footer/Footer';
import Admin from './Admin/Admin';
class App extends React.Component {
  checkSession = () => {
    if (sessionStorage.getItem('user')) {
      const data = JSON.parse(sessionStorage.getItem('user'));
      if (data.isManager) {
        return (<Route path="/Admin" component = {Admin}>
        </Route>)
      }
    }
    return null;
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            {this.checkSession()}
            <Route path="/">
              <Header />
              <Directional />
              <Footer />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    issetUser: state.issetUser
  }
}
export default connect(mapStateToProps)(App)
