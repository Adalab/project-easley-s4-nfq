import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import User from "../User";
import "./Reasons.scss";

class Reasons extends Component {
  render() {
    return (
      <Fragment>
        <div className="reasons__container">
          <div className="showreasons__title">
            Show reasons <i className="fas fa-angle-down" />
          </div>
          <div>
            <h3 className="reason__title">REASONS:</h3>
            <User pullRequests={this.props.pullRequests} />
            <p />
          </div>
        </div>
      </Fragment>
    );
  }
}
Reasons.propTypes = {
  pullRequests: PropTypes.arrayOf(PropTypes.object).isRequired
}
export default Reasons;
