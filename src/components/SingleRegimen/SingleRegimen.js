import React from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
import { Link } from 'react-router-dom';

import './SingleRegimen.scss';
import regimenData from '../../helpers/data/regimenData';

class Singleregimen extends React.Component {
  state = {
    regimen: {},
  }

  componentDidMount() {
    const regimenId = this.props.match.params.id;
    regimenData.getSingleRegimen(regimenId)
      .then(regimenPromise => this.setState({ regimen: regimenPromise.data }))
      .catch(err => console.error('unable to get single regimen', err));
  }

  render() {
    const { regimen } = this.state;
    const editLink = `/edit/${this.props.match.params.id}`;
    return (
      <div className="Home">
      <div className="leftApp">
      <h1 className="regimenHeading">{regimen.title}</h1>
      <div className="regimenCard col-4 m-2">
        <h3>{regimen.isPrivate}</h3>
        <Link className="btn btn-info" to={editLink}>Edit</Link>
        <button href="#" className="btn btn-danger" onClick={this.deleteregimen}>Delete</button>
      </div>
      </div>
      <div className="rightApp">
          <h5 className="username">@JeressiaJay365</h5>
        </div>
      </div>
    );
  }
}

export default Singleregimen;
