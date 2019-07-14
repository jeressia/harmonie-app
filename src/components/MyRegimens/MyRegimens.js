import React, { Component } from 'react';

import './MyRegimens.scss';

export class MyRegimens extends Component {
  render() {
    return (
      <div className="MyRegimens">
        <div className="leftApp">
            <h1 className="regimenHeading">My Regimens</h1>
        </div>
        <div className="rightApp">
          <h5 className="username">@JeressiaJay365</h5>
        </div>
      </div>
    );
  }
}

export default MyRegimens;
