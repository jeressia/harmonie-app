import React from 'react';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';

import logo from './logo.png';
import './MyNavbar.scss';

class MyNavbar extends React.Component {
  state= {
    isOpen: false,
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    const buildNavbar = () => {
      if (authed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to='/all' className="inactive">All Regimens&nbsp;&nbsp;|  </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/home' className="inactive">My Regimens&nbsp;&nbsp;|  </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/new' className="inactive">New Regimen&nbsp;&nbsp;|  </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.logMeOut} className="inactive">Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className="ml-auto" navbar />;
    };

    return (
      <div className="MyNavbar">
        <Navbar expand="md">
          <Link to="/home" className="navbar-brand"><img src={logo} alt="HARMONIE logo" className="logo"/></Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
