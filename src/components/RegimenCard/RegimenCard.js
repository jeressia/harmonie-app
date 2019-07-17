import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import { Link } from 'react-router-dom';

import './RegimenCard.scss';

class RegimenCard extends React.Component {
  render() {
    const { regimen, regimenType } = this.props;
    const editLink = `/edit/${regimen.id}`;
    const singleLink = `/Regimen/${regimen.id}`;
    const creator = firebase.auth().currentUser.uid === regimen.uid;
    return (
      <div className="RegimenCard col-3">
        <div className="card">
          <div className="card-body" id={regimen.typeId}>
            <Link className="card-title" to={singleLink}>{regimen.title}</Link>
            <p className="card-text">{regimenType.name}</p>
            {
            creator ? (
              <div className="bottom-card-buttons">
            <Link className="btn btn-secondary editBtn" to={editLink}><i class="fas fa-pencil-alt"></i></Link>
            <Link className="btn btn-secondary deleteBtn" to={editLink}>x</Link>
            </div>
            ) : (
              null
            )
          }
          </div>
        </div>
      </div>
    );
  }
}

export default RegimenCard;
