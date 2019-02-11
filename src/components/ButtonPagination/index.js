import React, { Component } from "react";
import "./ButtonPagination.scss";

class ButtonPagination extends Component {
  render() {
    const {
      getNextPullRequests,
      getPreviousPullRequests,
      uriNextPage,
      uriPrevPage
    } = this.props;

    return (
      <div className="button_container">
        {uriPrevPage && (
          <button className="prcard__button" onClick={getPreviousPullRequests}>
            <i className="fas fa-caret-left"></i>
          </button>
        )}
        {uriNextPage && (
          <button className="prcard__button" onClick={getNextPullRequests}>
          <i className="fas fa-caret-right"></i>
          </button>
        )}
      </div>
    );
  }
}

export default ButtonPagination;
