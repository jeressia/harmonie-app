import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';

import './MyNavbar.scss';

const logo = './harmonielogo.png';

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
              <NavLink tag={RRNavLink} to='/home'>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/new'>New Scat</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.logMeOut}>Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className="ml-auto" navbar />;
    };

    return (
      <div className="MyNavbar">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/"><img src="https://github.com/jeressia/harmonie-app/blob/master/src/MyNavbar/harmonielogo.png?raw=true" className="logo" alt="logo"/></NavbarBrand>
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
