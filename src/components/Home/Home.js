import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import regimenData from '../../helpers/data/regimenData';


import RegimenCard from '../RegimenCard/RegimenCard';

import './Home.scss';

class Home extends React.Component {
  state={
    regimens: [],
  }

  getRegimens = () => {
    regimenData.getMyRegimens(firebase.auth().currentUser.uid)
      .then(regimens => this.setState({ regimens }))
      .catch(err => console.error('uh-oh, regimens', err));
  }

  componentWillMount() {
    this.getRegimens();
  }

  render() {
    const makeRegimenCards = this.state.regimens.map(regimen => (
      <RegimenCard
      key={regimen.id}
      regimen={regimen}
      />
    ));

    return (
      <div className="Home">
      <div className="leftApp">
      <h1 className="regimenHeading">My Regimens</h1>
            <div className="col">
            <div className="d-flex flex-wrap col">
              {makeRegimenCards}
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
