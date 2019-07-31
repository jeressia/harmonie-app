import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import regimenData from '../../helpers/data/regimenData';
import stepData from '../../helpers/data/stepData';
import typeData from '../../helpers/data/typeData';

import './NewRegimen.scss';

const defaultRegimen = {
  typeId: '',
  title: '',
  isPrivate: '',
  uid: '',
};

export class NewRegimen extends Component {
  state = {
    newRegimen: defaultRegimen,
    types: [],
    newStep: '',
    regimenId: '',
    stepNum: 1,
    steps: [],
  }

  createNewRegimen = () => {
    // const regimenId = firebase.database().ref().child('/regimens').push().key;

    const newRegimenObj = {
      type: this.state.newRegimen.type,
      title: this.state.newRegimen.title,
      isPrivate: this.state.newRegimen.isPrivate,
      uid: firebase.auth().currentUser.uid,
    };

    regimenData.postRegimen(newRegimenObj)
      .then(regimen => this.setState({ regimenId: regimen.data.name }))
      .catch(err => console.error('wrong'));
  };

  SaveStepAndAddField = () => {
    const newStepObj = {
      regimenId: this.state.regimenId,
      stepNum: this.state.stepNum,
      stepText: this.state.newStep,
    };
    stepData.postStep(newStepObj)
      .then(() => {
        this.setState({ stepNum: this.state.stepNum + 1, newStep: '' });
        this.getAllSteps();
      })
      .catch(err => console.error('error'));
  }

  formFieldStringState = (name, e) => {
    const tempRegimen = { ...this.state.newRegimen };
    tempRegimen[name] = e.target.value;
    this.setState({ newRegimen: tempRegimen });
  }

  formFieldStringStateSteps = (name, e) => {
    const tempStep = { ...this.state.newStep };
    tempStep[name] = e.target.value;
    this.setState({ newStep: tempStep });
  }

  formSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/home');
  }

  onCancel = (e) => {
    e.stopPropagation();
    this.props.history.goBack();
  }

  titleChange = e => this.formFieldStringState('title', e);

  typeChange = e => this.formFieldStringState('type', e);

  stepChange = e => this.setState({ newStep: e.target.value });

  privacyChange = e => this.formFieldStringState('isPrivate', e);

  getTypes = () => {
    typeData.getTypes()
      .then(types => this.setState({ types }))
      .catch(err => console.error('uh-oh, types', err));
  }

  componentDidMount() {
    this.getTypes();
  }

  getAllSteps = () => {
    stepData.getMySteps(this.state.regimenId)
      .then(steps => this.setState({ steps }))
      .catch(err => console.error('uh-oh, steps', err));
  }

  render() {
    const {
      newRegimen,
      types,
      regimenId,
      newStep,
    } = this.state;
    const showSteps = this.state.steps.map(step => (<div>{step.stepText}</div>));
    return (
      <div id="f2_container">
      <div id="f2_card" class="shadow">
        <div class="front face">
          <div className="Home">
            <div className="leftApp">
              <h1 className="regimenHeading">New Regimen</h1>
                {
                (regimenId) ? (
                  <form onSubmit={ e => e.preventDefault()}>
                  {showSteps}
                  <div className="form-group">
                    <label htmlFor="title">Task One</label>
                    <input
                    type="text"
                    className="form-control"
                    id="taskOne"
                    placeholder="Task One"
                    value = {newStep}
                    onChange= {this.stepChange}
                    />
                    <button type="submit" className="btn btn-primary d-block" onClick={this.SaveStepAndAddField}>More Steps</button>
                    <button type="submit" className="btn btn-primary d-block" onClick={this.formSubmit}>Save Regimen</button>
                  </div>
                </form>
                ) : (
                  <form onSubmit={ e => e.preventDefault()}>
                  <div className="newRegType">
                  <h2>Regimen Type</h2>
                <select value={newRegimen.type} onChange={this.typeChange} id="type">
                  <option value="type">Type</option>
                  {types.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
                </div>
                <input className="m-2" type="radio" name="isPrivate" value={false} onChange={this.privacyChange} checked={this.state.newRegimen.isPrivate === 'false'}/> Public
        <input className="m-2" type="radio" name="isPrivate" value={true} onChange={this.privacyChange} checked={this.state.newRegimen.isPrivate === 'true'}/> Private
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="John's Hair Regimen"
                    value = {newRegimen.title}
                    onChange= {this.titleChange}
                    />
                  </div>
                            <button type="submit" className="btn btn-primary d-block" onClick={this.createNewRegimen}>Add Steps</button>
                  <button className="btn btn-primary d-block" onClick={this.onCancel}>Cancel</button>
                  </form>
                )
                  }
      </div>
      <div class="back face center">
            <p>This is nice for exposing more information about an image.</p>
          <p>Any content can go here.</p>
            </div>
            </div>
            </div>
            </div>
            </div>
    );
  }
}

export default NewRegimen;
