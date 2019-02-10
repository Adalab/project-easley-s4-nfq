import React, { Component } from 'react';
import './StatusTab.scss';
import PropTypes from 'prop-types';

class StatusTab extends Component {
  render() {
    const {status , selected } = this.props
    return (
      <button className={`details__tab ${selected}`}>{status}</button>
    );
  }
}

StatusTab.propTypes = {
  status: PropTypes.string,
  selected: PropTypes.string
}
export default StatusTab;
