import React, { Component, Fragment } from 'react';
import "./Loader.scss";

class Loader extends Component {
  render() {
    return (
      <Fragment>
        <div className="loader__container">
        <p>Loading...</p>
        <div class="pulse-loader"></div>
        </div>
      </Fragment>
    )
  }
}

export default Loader;
