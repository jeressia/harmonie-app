import React from 'react';

import typeData from '../../helpers/data/typeData';
import regimenData from '../../helpers/data/regimenData';


import RegimenCard from '../RegimenCard/RegimenCard';

import '../Home/Home.scss';

class AllRegimens extends React.Component {
  state={
    regimens: [],
    types: [],
  }

  getAllRegimens = () => {
    regimenData.getAllRegimens()
      .then(regimens => this.setState({ regimens }))
      .catch(err => console.error('uh-oh, all regimens', err));
  }

  getTypes = () => {
    typeData.getTypes()
      .then(types => this.setState({ types }))
      .catch(err => console.error('uh-oh, types', err));
  }

  deleteRegimen = (regimenId) => {
    regimenData.deleteRegimen(regimenId)
      .then(() => this.getRegimens())
      .catch(err => console.error('unable to delete', err));
  }

  componentWillMount() {
    this.getAllRegimens();
    this.getTypes();
  }

  render() {
    const makeAllRegimenCards = this.state.regimens.map((regimen) => {
      const myType = this.state.types.find(x => x.id === regimen.type);
      return <RegimenCard
      key={regimen.id}
      regimen={regimen}
      regimenType={myType || {}}
      deleteRegimen={this.deleteRegimen}
      />;
    });

    return (
      <div id="f1_container">
      <div id="f1_card" class="shadow">
        <div class="front face">
      <div className="Home">
            <div className="col-12">
            <div className="headerOptions">
              <h1 className="regimenHeading">All Regimens</h1>
              <i class="fas fa-user" id="fa-user"></i>
              </div>
            <div className="d-flex flex-wrap col-12">
              {makeAllRegimenCards}
            </div>
            </div>
            </div>
            </div>
            <div class="back face center">
            <p>This is nice for exposing more information about an image.</p>
          <p>Any content can go here.</p>
            </div>
            </div>
            </div>
    );
  }
}

export default AllRegimens;
