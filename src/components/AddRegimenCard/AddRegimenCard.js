import React from 'react';
import { Link } from 'react-router-dom';

import './AddRegimenCard.scss';

class RegimenCard extends React.Component {
  render() {
    const addLink = '/new';
    return (
      <div className="RegimenCard">
        <div className="addcard">
          <div className="card-body">
            <Link to={ addLink } className="plus">+</Link>
            <p className="smalltext">Add New Regimen</p>
            </div>
          </div>
        </div>
    );
  }
}

export default RegimenCard;
