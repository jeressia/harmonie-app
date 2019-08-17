import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './RegimenCard.scss';

class RegimenCard extends React.Component {
  static propTypes = {
    deleteRegimen: propTypes.func.isRequired,
  };

  deleteMe = () => {
    const regimenId = this.props.regimen.id;
    this.props.deleteRegimen(regimenId);
  }

  render() {
    const { regimen, regimenType } = this.props;
    const editLink = `/edit/${regimen.id}`;
    const singleLink = `/Regimen/${regimen.id}`;
    const creator = firebase.auth().currentUser.uid === regimen.uid;
    return (
      <div className="RegimenCard">
        <div className="card">
          <div className="card-body" id={regimen.type}>
            <Link className="card-title" to={singleLink}>{regimen.title}</Link>
            <p className="card-text">{regimenType.name}</p>
            {
            creator ? (
              <div className="bottom-card-buttons">
            <Link className="btn btn-secondary editBtn" to={editLink}><i className="fas fa-pencil-alt"></i></Link>
            <button className="btn btn-secondary deleteBtn" onClick={this.deleteMe}>x</button>
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
