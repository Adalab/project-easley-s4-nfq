import React, { Component } from 'react';
import './StatusTab.scss';

class StatusTab extends Component {
  constructor(props) {
    super(props);
  this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    const { tab, handleTab } = this.props;
    handleTab(tab);
}
  render() {
    return (
      <button onClick={this.onClick} className={`details__tab ${this.props.selected}`}>{this.props.status}</button>
    );
  }
}

export default StatusTab;
