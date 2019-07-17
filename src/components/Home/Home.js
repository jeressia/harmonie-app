import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import typeData from '../../helpers/data/typeData';
import regimenData from '../../helpers/data/regimenData';


import RegimenCard from '../RegimenCard/RegimenCard';
import AddRegimenCard from '../AddRegimenCard/AddRegimenCard';

import './Home.scss';

class Home extends React.Component {
  state={
    regimens: [],
    types: [],
  }

  getRegimens = () => {
    regimenData.getMyRegimens(firebase.auth().currentUser.uid)
      .then(regimens => this.setState({ regimens }))
      .catch(err => console.error('uh-oh, regimens', err));
  }

  getTypes = () => {
    typeData.getTypes()
      .then(types => this.setState({ types }))
      .catch(err => console.error('uh-oh, types', err));
  }

  componentWillMount() {
    this.getRegimens();
    this.getTypes();
  }

  render() {
    const makeRegimenCards = this.state.regimens.map((regimen) => {
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
      <h1 className="regimenHeading">My Regimens</h1>
            <div className="col-12">
            <div className="d-flex flex-wrap col-12">
              {makeRegimenCards}
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

export default Home;
