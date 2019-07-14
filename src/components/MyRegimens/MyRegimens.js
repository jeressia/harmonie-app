import React, { Component } from 'react';

import RegimenCard from '../RegimenCard/RegimenCard';
import './MyRegimens.scss';

export class MyRegimens extends Component {
  render() {
    const makeRegimenCards = this.state.regimens.map(regimen => (
      <RegimenCard
      key={regimen.id}
      regimen={regimen}
      />
    ));
    return (
      <div className="MyRegimens">
        <div className="leftApp">
            <h1 className="regimenHeading">My Regimens</h1>
            {makeRegimenCards}
        </div>
        <div className="rightApp">
          <h5 className="username">@JeressiaJay365</h5>
        </div>
      </div>
    );
  }
}

export default MyRegimens;
