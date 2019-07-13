import React from 'react';

import Auth from '../Auth/Auth';
import MyNavbar from '../MyNavbar/MyNavbar';

import './App.scss';

import fbConnection from '../helpers/data/connection';

fbConnection();

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MyNavbar />
        <Auth />
      </div>
    );
  }
}

export default App;
