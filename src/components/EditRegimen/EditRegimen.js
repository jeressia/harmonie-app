import React, { Component } from 'react';

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

export class EditRegimen extends Component {
  state = {
    newRegimen: defaultRegimen,
    types: [],
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

  formSubmit = (e) => {
    e.stopPropagation();
    const saveMe = { ...this.state.newRegimen };
    const regimenId = this.props.match.params.id;
    console.error(regimenId);
    regimenData.putRegimen(saveMe, regimenId)
      .then(() => this.props.history.push('/home'))
      .catch(err => console.error('unable to save', err));
  }

  onCancel = (e) => {
    e.stopPropagation();
    this.props.history.push('/home');
  }

  titleChange = e => this.formFieldStringState('title', e);

  typeChange = e => this.formFieldStringState('type', e);

  render() {
    const { newRegimen, types } = this.state;
    return (
      <div>
        <h1>Edit Regimen</h1>
        <form onSubmit={ e => e.preventDefault()}>
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
          <button type="submit" className="btn btn-primary d-block" onClick={this.formSubmit}>Update Regimen</button>
          <button className="btn btn-primary d-block" onClick={this.onCancel}>Cancel</button>
          </form>
      </div>
    );
  }
}

export default EditRegimen;
