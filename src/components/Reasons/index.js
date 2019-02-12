import React, { Component, Fragment } from "react";
import User from "../User";
import "./Reasons.scss";

class Reasons extends Component {
  render() {
    const { reason, state } = this.props;
    if (state === "DECLINED") {
      return (
      <Fragment>
        <div className="reasons__container">
          <div className="showreasons__title">
            Show reasons <i className="fas fa-angle-down" />
          </div>
          <div>
            <h3 className="reason__title">REASONS: {reason}</h3>
          </div>
          <User />
        </div>
      </Fragment>
    );
    } else {
      return null
    }
  }
}

export default Reasons;
