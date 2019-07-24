import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import regimenData from '../../helpers/data/regimenData';
import typeData from '../../helpers/data/typeData';

import './NewRegimen.scss';

const defaultRegimen = {
  typeId: '',
  title: '',
  isPrivate: '',
  uid: '',
};

// const defaultStep = {
//   regimenId: '',
//   stepNum: '',
//   stepText: '',
// };

export class NewRegimen extends Component {
  state = {
    newRegimen: defaultRegimen,
    types: [],
    steps: [],
  }

  formFieldStringState = (name, e) => {
    const tempRegimen = { ...this.state.newRegimen };
    tempRegimen[name] = e.target.value;
    this.setState({ newRegimen: tempRegimen });
  }

  formFieldStringStateSteps = (name, e) => {
    const tempSteps = { ...this.state.newSteps };
    tempSteps[name] = e.target.value;
    this.setState({ newSteps: tempSteps });
  }

  formSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newRegimen };
    saveMe.uid = firebase.auth().currentUser.uid;
    regimenData.postRegimen(saveMe)
      .then(() => this.props.history.goBack())
      .catch(err => console.error('unable to save', err));
  }

  onCancel = (e) => {
    e.stopPropagation();
    this.props.history.goBack();
  }

  titleChange = e => this.formFieldStringState('title', e);

  typeChange = e => this.formFieldStringState('type', e);

  oneChange = e => this.formFieldStringStateSteps('stepText', e);

  getTypes = () => {
    typeData.getTypes()
      .then(types => this.setState({ types }))
      .catch(err => console.error('uh-oh, types', err));
  }

  componentDidMount() {
    this.getTypes();
  }

  render() {
    const { newRegimen, types } = this.state;
    return (
      <div className="Home">
      <div className="leftApp">
      <h1 className="regimenHeading">New Regimen</h1>
        <form onSubmit={ e => e.preventDefault()}>
          <h2>Regimen Type</h2>
        <select value={newRegimen.type} onChange={this.typeChange} id="type">
          <option value="type">Type</option>
          {types.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
        <input className="m-2" type="radio" name="isPrivate" value="public"/> Public
<input className="m-2" type="radio" name="isPrivate" value="private"/> Private
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
          <div className="form-group">
            <label htmlFor="title">Task One</label>
            <input
            type="text"
            className="form-control"
            id="title"
            placeholder="John's Hair Regimen"
            value = {newRegimen.title}
            onChange= {this.oneChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Task Two</label>
            <input
            type="text"
            className="form-control"
            id="title"
            placeholder="John's Hair Regimen"
            value = {newRegimen.title}
            onChange= {this.titleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Task Three</label>
            <input
            type="text"
            className="form-control"
            id="title"
            placeholder="John's Hair Regimen"
            value = {newRegimen.title}
            onChange= {this.titleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary d-block" onClick={this.formSubmit}>Save Regimen</button>
          <button className="btn btn-primary d-block" onClick={this.onCancel}>Cancel</button>
          </form>
      </div>
        <div className="rightApp">
          <h5 className="username">@JeressiaJay365</h5>
        </div>
      </div>
    );
  }
}

export default NewRegimen;
