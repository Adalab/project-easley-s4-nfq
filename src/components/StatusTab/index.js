import React, { Component } from 'react';
import './StatusTab.scss';

class StatusTab extends Component {
  render() {
    const { tab, handleTab } = this.props;
    return (
      <button onClick={handleTab} tab={tab} className={`details__tab ${this.props.selected}`}>{this.props.status}</button>
    );
  }
}

export default StatusTab;
