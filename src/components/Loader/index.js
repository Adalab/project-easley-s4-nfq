import React, { Component, Fragment } from 'react';
import "./Loader.scss";

class Loader extends Component {
  render() {
    return (
      <Fragment>
        <div className="loader__container">
        <p className="loader__container--text">Loading...</p>
        <div className="loader__container--animation"></div>
        </div>
      </Fragment>
    )
  }
}

export default Loader;
