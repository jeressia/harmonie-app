import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import flowerphoto from './authphoto.jpg';
import lemonphoto from './facephoto.jpg';
import feetphoto from './feet.jpg';

import './Auth.scss';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  render() {
    return (
      <div className="Auth d-flex">
        <div className="leftText">
          <h1 className="authHeading">Find Your Balance.</h1>
          <p className="authText">
            Harmonie helps you create the perfect regimens for your busy
            lifestyle and pairs them with music that gets you excited about
            taking care of business.
          </p>
          <button className="btn login" onClick={this.loginClickEvent}>
            Log In
          </button>
        </div>
        <div className="authPhotos">
          <div className="leftPhoto">
            <img
              className="d-block authLeftPhoto"
              src={flowerphoto}
              alt="Woman with flowers in her hair"
            />
          </div>
          <div className="rightPhotos">
            <img
              className="d-block authPhotoRight"
              src={lemonphoto}
              alt="Woman underwater with lemon slices floating above her face"
            />
            <img
              className="d-block authPhotoRight1"
              src={feetphoto}
              alt="Manicured Hands touching pedicured feet"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
