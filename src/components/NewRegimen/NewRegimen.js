import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import regimenData from '../../helpers/data/regimenData';
import typeData from '../../helpers/data/typeData';

const defaultRegimen = {
  typeId: '',
  title: '',
  isPrivate: '',
  uid: '',
};

// const defaultType = {
//   id: '',
//   name: '',
//   color: '',
//   uid: '',
// };

export class NewRegimen extends Component {
  state = {
    newRegimen: defaultRegimen,
    types: [],
  }

  formFieldStringState = (name, e) => {
    const tempRegimen = { ...this.state.newRegimen };
    tempRegimen[name] = e.target.value;
    this.setState({ newRegimen: tempRegimen });
  }

  formSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newRegimen };
    saveMe.uid = firebase.auth().currentUser.uid;
    console.error('thing to save', saveMe);
    regimenData.postRegimen(saveMe)
      .then(() => this.props.history.push('/home'))
      .catch(err => console.error('unable to save', err));
  }

  onCancel = (e) => {
    e.stopPropagation();
    this.props.history.goBack();
  }

  titleChange = e => this.formFieldStringState('title', e);

  typeChange = e => this.formFieldStringState('type', e);

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
          <input className="m-2" type="radio" name="isPrivate" value="public"/> Public
<input className="m-2" type="radio" name="isPrivate" value="private"/> Private
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
