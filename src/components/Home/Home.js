import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import regimenData from '../../helpers/data/regimenData';
import typeData from '../../helpers/data/typeData';

import MyUsers from '../Users/Users';
import RegimenCard from '../RegimenCard/RegimenCard';
import AddRegimenCard from '../AddRegimenCard/AddRegimenCard';

import './Home.scss';

class Home extends React.Component {
  _isMounted = false;

  state={
    regimens: [],
    types: [],
    currentState: true,
    isLoading: true,
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

  deleteRegimen = (regimenId) => {
    regimenData.deleteRegimen(regimenId)
      .then(() => this.getRegimens())
      .catch(err => console.error('unable to delete', err));
  }

  componentWillMount() {
    this.getRegimens();
    this.getTypes();
  }

  cardFlipEvent = () => {
    document.getElementById('f1_card').classList.add('card-flip');
  }


  render() {
    const makeRegimenCards = this.state.regimens.map((regimen) => {
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
      <div id="f1_card" className="shadow">
        <div className="front face">
          <div className="AllRegimens">
            <div className="col-12">
              <div className="headerOptions">
              <h1 className="regimenHeading">My Regimens</h1>
              <div className="icon" onMouseEnter={this.cardFlipEvent}>
              <i className="fas fa-user" id="fa-user"></i>
              </div>
              </div>
              <div className="d-flex flex-wrap col-12">
                {makeRegimenCards}
                <AddRegimenCard />
                </div>
          </div>
        </div>
      </div>
      <div className="back face center">
     <MyUsers/>
      </div>
      </div>
  </div>
    );
  }
}

export default Home;
