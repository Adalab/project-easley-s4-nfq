import React, { Component } from 'react';
import './ButtonPagination.scss';

class ButtonPagination extends Component {

  render() {

    const {getNextPullRequests, getPreviousPullRequests} = this.props;

    return (
      <div className="button_container">
      <button onClick={getPreviousPullRequests} className="previous">Prev</button>
      <button onClick={getNextPullRequests} className="next">Next</button>
      </div>
     );
  }
}

export default ButtonPagination;
