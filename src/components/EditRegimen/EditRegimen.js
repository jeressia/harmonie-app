import React, { Component } from 'react';

import regimenData from '../../helpers/data/regimenData';
import typeData from '../../helpers/data/typeData';

const defaultRegimen = {
  typeId: '',
  title: '',
  isPrivate: '',
  uid: '',
};

const defaultStep = {
  regimenId: '',
  stepNum: '',
  stepText: '',
};

export class EditRegimen extends Component {
  state = {
    newRegimen: defaultRegimen,
    types: [],
    steps: defaultStep,
  }

  componentDidMount() {
    const regimenId = this.props.match.params.id;
    regimenData.getSingleRegimen(regimenId)
      .then(regimenPromise => this.setState({ newRegimen: regimenPromise.data }))
      .catch(err => console.error('uh-oh, edit', err));

    typeData.getTypes()
      .then(types => this.setState({ types }))
      .catch(err => console.error('uh-oh, editTypes', err));
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
    e.stopPropagation();
    const saveMe = { ...this.state.newRegimen };
    const regimenId = this.props.match.params.id;
    regimenData.putRegimen(saveMe, regimenId)
      .then(() => this.props.history.goBack())
      .catch(err => console.error('unable to save', err));
  }

  onCancel = (e) => {
    e.stopPropagation();
    this.props.history.goBack();
  }

  titleChange = e => this.formFieldStringState('title', e);

  typeChange = e => this.formFieldStringState('type', e);

  privacyChange = e => this.formFieldStringState('isPrivate', e);

  oneChange = e => this.formFieldStringStateSteps('stepText', e);

  render() {
    const { newRegimen, types } = this.state;
    return (
      <div className="Home">
      <div className="leftApp">
      <h1 className="regimenHeading">Edit {newRegimen.title}</h1>
        <form onSubmit={ e => e.preventDefault()}>
        <select value={newRegimen.type} onChange={this.typeChange} id="type">
          <option value="type">Type</option>
          {types.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
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
          <button type="submit" className="btn btn-primary d-block" onClick={this.formSubmit}>Update Regimen</button>
          <button className="btn btn-primary d-block" onClick={this.onCancel}>Cancel</button>
          </form>
      </div>
      </div>
    );
  }
}

export default EditRegimen;
