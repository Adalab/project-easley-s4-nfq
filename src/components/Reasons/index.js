import React, { Component, Fragment } from "react";
import User from "../User";
import PropTypes from 'prop-types';
import "./Reasons.scss";

class Reasons extends Component {
  constructor(props) {
    super(props);
    this.state= {
      show: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
  const { show } = this.state;
  this.setState( { show : !show } )

}

  render() {
    const { reason, state, avatar, author, date } = this.props;
    if (state === "DECLINED") {
      return (
      <Fragment>
        {reason && (
        <div className="reasons__container">
          <button className="showreasons__title" onClick={this.onClick}>
            Show reasons <i className="fas fa-angle-down" />
          </button>
          {this.state.show && (
          <div>
          <User avatar={avatar} author={author} date={date} reasonClass="reason__user" />
          <div>
            <h3 className="reason__title">{reason}</h3>
          </div>
          </div>)}
        </div>)}
      </Fragment>
    );
    } else {
      return null
    }
  }
}

Reasons.propTypes = {
  avatar: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string
}


export default Reasons;
