import React, { Component } from 'react';

import './AllRegimens.scss';

export class AllRegimens extends Component {
  render() {
    return (
      <div className="AllRegimens">
        <fieldset>
          <legend>All Regimens</legend>
          Name: <input type="text"/><br/>
            Email: <input type="text"/><br/>
              Date of birth: <input type="text"/>
        </fieldset>
      </div>
    );
  }
}

export default AllRegimens;
