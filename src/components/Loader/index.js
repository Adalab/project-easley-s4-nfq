import React, { Component, Fragment } from 'react';
import "./Loader.scss";
import NfqLogo from '../../images/nfq-logo.png'

class Loader extends Component {
  render() {
    return (
      <Fragment>
        <div>
        <p>Loading...</p>
        <img src={NfqLogo} alt="nfq-logo"/>
        </div>
      </Fragment>
    )
  }
}

export default Loader;
