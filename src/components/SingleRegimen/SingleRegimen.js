import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import 'bootstrap';

import './SingleRegimen.scss';
import regimenData from '../../helpers/data/regimenData';
import stepData from '../../helpers/data/stepData';

class Singleregimen extends React.Component {
  state = {
    regimen: {},
    steps: [],
  }

  getSingleRegimen = () => {
    const regimenId = this.props.match.params.id;
    console.error(regimenId, 'regimenId');
    regimenData.getSingleRegimen(regimenId)
      .then(regimenPromise => this.setState({ regimen: regimenPromise.data }))
      .catch(err => console.error('unable to get single regimen', err));
  }

  getSteps = () => {
    const regimenId = this.props.match.params.id;
    stepData.getMySteps(regimenId)
      .then(steps => this.setState({ steps }))
      .catch(err => console.error('uh-oh, types', err));
  }

  componentDidMount() {
    this.getSingleRegimen();
    this.getSteps();
  }

  render() {
    const { regimen, steps } = this.state;
    console.error(steps);
    const editLink = `/edit/${this.props.match.params.id}`;
    const creator = firebase.auth().currentUser.uid === regimen.uid;
    return (
      <div className="Home">
      <div className="leftApp">
      <h1 className="regimenHeading">{regimen.title}    {
            creator ? (
              <div>
            <Link to={editLink}><i class="fas fa-pencil-alt"></i></Link>
            </div>
            ) : (
              null
            )
          }</h1>
      <div>
        <div class="stepTable">
      <table class="table table-striped">
        <tbody>
        {steps.map(step => <tr>
            <div class="stepNum">{step.stepNum}</div> {step.stepText}
          </tr>)
        }
        </tbody>
          </table>
        <Link className="btn btn-light" onClick={this.startMe}>Start</Link>
        {
            creator ? (
              <div>
            <Link className="btn" onClick={this.deleteMe}>x</Link>
            </div>
            ) : (
              null
            )
          }
          </div>
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
