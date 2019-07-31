import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import regimenData from '../../helpers/data/regimenData';
import typeData from '../../helpers/data/typeData';

import RegimenCard from '../RegimenCard/RegimenCard';
import AddRegimenCard from '../AddRegimenCard/AddRegimenCard';

import './Home.scss';

class Home extends React.Component {
  state={
    regimens: [],
    types: [],
    currentState: true,
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

  cardFlipBackEvent = () => {
    document.getElementById('f1_card').classList.remove('card-flip');
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
          <div className="Home">
            <div className="col-12">
              <div className="headerOptions">
              <h1 className="regimenHeading">My Regimens</h1>
              <i class="fas fa-user" id="fa-user" onMouseEnter={this.cardFlipEvent}></i>
              </div>
              <div className="d-flex flex-wrap col-12">
                {makeRegimenCards}
                <AddRegimenCard />
              </div>
            </div>
          </div>
        </div>
        <div className="back face center" onMouseLeave={this.cardFlipBackEvent}>
        <h1 className="regimenHeading">@JERESSIAJAY365</h1>
          <p>This is nice for exposing more information about an image.</p>
          <p>Any content can go here.</p>
        </div>
        </div>
    </div>
    );
  }
}

export default Home;
