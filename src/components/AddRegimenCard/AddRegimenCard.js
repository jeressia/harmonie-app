import React from 'react';
import { Link } from 'react-router-dom';

import './AddRegimenCard.scss';

class RegimenCard extends React.Component {
  render() {
    const addLink = '/new';
    return (
      <div className="RegimenCard col-3">
        <div className="addcard">
          <div className="card-body">
            <Link to={ addLink} className="stretched-link plus">+</Link>
            <p className="smalltext">Add New Regimen</p>
            </div>
          </div>
        </div>
    );
  }
}

export default RegimenCard;
