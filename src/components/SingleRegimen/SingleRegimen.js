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
    regimenData.getSingleRegimen(regimenId)
      .then(regimenPromise => this.setState({ regimen: regimenPromise.data }))
      .catch(err => console.error('unable to get single regimen', err));
  }

  getSteps = () => {
    const regimenId = this.props.match.params.id;
    stepData.getMySteps(regimenId)
      .then((steps) => {
        const stepsToSort = steps;
        stepsToSort.sort((a, b) => {
          const aStep = a.stepNum;
          const bStep = b.stepNum;
          // eslint-disable-next-line no-nested-ternary
          return aStep < bStep ? -1 : aStep > bStep ? 1 : 0;
        });
        this.setState({ steps: stepsToSort });
      })
      .catch(err => console.error('uh-oh, types', err));
  }

  onCancel = (e) => {
    e.stopPropagation();
    this.props.history.goBack();
  }

  componentDidMount() {
    this.getSingleRegimen();
    this.getSteps();
  }

  render() {
    const { regimen, steps } = this.state;
    const editLink = `/edit/${this.props.match.params.id}`;
    const creator = firebase.auth().currentUser.uid === regimen.uid;
    return (
      <div className="Home">
      <div className="leftApp">
      <h1 className="regimenHeading">{regimen.title}    {
            creator ? (
              <div>
            <Link to={editLink}><i className="fas fa-pencil-alt"></i></Link>
            </div>
            ) : (
              null
            )
          }</h1>
      <div>
        <div className="stepTable">
      <table className="table table-striped">
        <tbody>
        {steps.map(step => <tr key={step.id}><span className="stepNum">{step.stepNum}</span>{step.stepText}</tr>)}
        </tbody>
          </table>
        <button className="btn btn-light" onClick={this.startMe}>Start</button>
        <button className="btn" onClick={this.onCancel}>Back</button>
          </div>
          </div>
          </div>
      </div>
    );
  }
}


export default Singleregimen;
