import React, { Component } from 'react';
import FileUploader from 'react-firebase-file-uploader';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

import userData from '../../helpers/data/userData';

import './Users.scss';

const defaultUser = {
  username: '',
  uid: '',
  aboutMe: '',
  imageUrl: '',
};

export class Users extends Component {
  state = {
    newUser: defaultUser,
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

  componentDidMount() {
    userData.getMyUserInfo(firebase.auth().currentUser.uid)
      .then(newUser => this.setState({ newUser: newUser[0] }))
      .catch(err => console.error('uh-oh, edit', err));
  }

  onCancel = (e) => {
    e.stopPropagation();
    this.props.history.goBack();
  }

  cardFlipBackEvent = () => {
    document.getElementById('f1_card').classList.remove('card-flip');
  }

  render() {
    const { newUser } = this.state;
    return (
      <div className="User">
        <h1>@{newUser.username}</h1>
        <img src="https://firebasestorage.googleapis.com/v0/b/harmonie-fd5d8.appspot.com/o/images%2F19732297_241084763076390_3873939817133237910_n.jpg?alt=media&token=acb2cc7f-4cbc-4cff-8aee-9742df27616a" alt="user" className="userImage" />
        <div className="form-group">
               <p>Change Image?</p>
               <FileUploader
                 accept='image/*'
                 name='image'
                 storageRef={firebase.storage().ref('images/')}
                 onUploadSuccess={this.handleUploadSuccess}
               />
        </div>
        <h4>{newUser.username}'s Beauty Philosophy</h4>
        <div className="userBio">
        {newUser.aboutMe}</div>
            <div className="userButtons">
             <button className="btn btn-success addSteps" onClick={this.updateProfile}>Update Profile</button>
             <button className="btn btn-success addSteps" onClick={this.cardFlipBackEvent}>Return to Regimens</button>
            </div>
      </div>
    );
  }
}

export default Users;
