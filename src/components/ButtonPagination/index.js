import React, { Component } from 'react';
import './ButtonPagination.scss';

class ButtonPagination extends Component {

  render() {

    const {getNextPullRequests, getPreviousPullRequests,  uriNextPage, uriPrevPage} = this.props;

    return (
      <div className="button_container">
       {uriPrevPage && <button onClick={getPreviousPullRequests} className="previous">Prev</button>}
      {uriNextPage && <button onClick={getNextPullRequests} className="next">Next</button>}
      </div>
     );
  }
}

export default ButtonPagination;
