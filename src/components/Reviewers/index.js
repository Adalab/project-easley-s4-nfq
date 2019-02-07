import React, { Component, Fragment } from 'react';

class Reviewers extends Component {
  render() {
    const {rvAvatar, rvName, develop} = this.props
    return (
      <Fragment>
        <div>
          <img src={rvAvatar} alt={rvName}/>
          <h4>{rvName}</h4>
          <h4>{develop}</h4>
        </div>
      </Fragment>
     );
  }
}

export default Reviewers;
