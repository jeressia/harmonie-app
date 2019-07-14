import React from 'react';
import { Link } from 'react-router-dom';

import './RegimenCard.scss';

class RegimenCard extends React.Component {
  render() {
    const { regimen } = this.props;
    const editLink = `/edit/${regimen.id}`;
    const singleLink = `/Regimen/${regimen.id}`;
    return (
      <div className="RegimenCard col-3 m-2">
        <div className="card">
          <div className="card-body" id={regimen.typeId}>
            <h5 className="card-title">{regimen.title}</h5>
            <Link className="btn btn-success" to={singleLink}>View</Link>
            <p className="card-text">{regimen.color}</p>
            <Link className="btn btn-info" to={editLink}>Edit</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default RegimenCard;
