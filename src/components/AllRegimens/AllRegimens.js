import React from 'react';

import typeData from '../../helpers/data/typeData';
import regimenData from '../../helpers/data/regimenData';


import RegimenCard from '../RegimenCard/RegimenCard';
import AddRegimenCard from '../AddRegimenCard/AddRegimenCard';

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

  componentWillMount() {
    this.getAllRegimens();
    this.getTypes();
  }

  render() {
    const makeAllRegimenCards = this.state.regimens.map((regimen) => {
      const myType = this.state.types.find(x => x.id === regimen.typeId);
      return <RegimenCard
      key={regimen.id}
      regimen={regimen}
      regimenType={myType || {}}
      />;
    });

    return (
      <div className="Home">
      <div className="leftApp">
      <h1 className="regimenHeading">All Regimens</h1>
            <div className="col-12">
            <div className="d-flex flex-wrap col-12">
              {makeAllRegimenCards}
            <AddRegimenCard />
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

export default AllRegimens;
