import React, { Component } from 'react';
import FileUploader from 'react-firebase-file-uploader';

import firebase from 'firebase/app';
import 'firebase/storage';

import './Users.scss';

export class Users extends Component {
  state = {
    imageUrl: '',
  }

  handleUploadSuccess = (filename) => {
    this.setState({
      image: filename,
    });
    firebase.storage().ref('images').child(filename).getDownloadURL()
      .then((url) => {
        this.setState({ imageUrl: url });
      })
      .catch(err => console.error('no image url', err));
  };

  render() {
    const username = 'jeressiajay365';
    const { imageUrl } = this.state;
    return (
      <div>
        <h1>@{username}</h1>
        <img src={imageUrl} alt="user" className="userImage" />
        <div className="form-group">
               <label htmlFor="itemImage">Change Image</label>
               <FileUploader
                 accept='image/*'
                 name='image'
                 storageRef={firebase.storage().ref('images/')}
                 onUploadSuccess={this.handleUploadSuccess}
               />
             </div>
      </div>
    );
  }
}

export default Users;
