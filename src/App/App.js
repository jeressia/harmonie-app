import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';


import Auth from '../components/Auth/Auth';
import Home from '../components/Home/Home';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import AllRegimens from '../components/AllRegimens/AllRegimens';
import NewRegimen from '../components/NewRegimen/NewRegimen';
import EditRegimen from '../components/EditRegimen/EditRegimen';
import SingleRegimen from '../components/SingleRegimen/SingleRegimen';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import fbConnection from '../helpers/data/connection';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to = {{ pathname: '/home', state: { from: props.location } }} />)
  );
  return <Route {...rest} render={props => routeChecker(props)}/>;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to = {{ pathname: '/auth', state: { from: props.location } }} />)
  );
  return <Route {...rest} render={props => routeChecker(props)}/>;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removelistener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removelistener();
  }

  render() {
    const { authed } = this.state;
    return (
    <div className="App">
      <BrowserRouter>
      <React.Fragment>
        <MyNavbar authed={authed} />
        <div className="container">
            <Switch>
              <PublicRoute path='/auth' component={Auth} authed={authed}/>
              <PrivateRoute path='/home' component={Home} authed={authed}/>

              <PrivateRoute path='/all' component={AllRegimens} authed={authed}/>
              <PrivateRoute path='/new' component={NewRegimen} authed={authed}/>
              <PrivateRoute path='/edit/:id' component={EditRegimen} authed={authed}/>
              <PrivateRoute path='/regimen/:id' component={SingleRegimen} authed={authed}/>

              {/* <Redirect from='*' to="/auth" /> */}
            </Switch>
          </div>
      </React.Fragment>
      </BrowserRouter>
    </div>
    );
  }
}

export default App;
