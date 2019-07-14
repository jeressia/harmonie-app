import React from 'react';
import { Link } from 'react-router-dom';

import './RegimenCard.scss';

class RegimenCard extends React.Component {
  render() {
    const { regimen } = this.props;
    const editLink = `/edit/${regimen.id}`;
    const singleLink = `/Regimen/${regimen.id}`;
    return (
      <div className="RegimenCard col-3">
        <div className="card">
          <div className="card-body" id={regimen.typeId}>
            <Link className="card-title" to={singleLink}>{regimen.title}</Link>
            <p className="card-text">Hair</p>
            <div className="bottom-card-buttons">
            <Link className="btn btn-secondary editBtn" to={editLink}><i class="fas fa-pencil-alt"></i></Link>
            <Link className="btn btn-secondary deleteBtn" to={editLink}>x</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegimenCard;
