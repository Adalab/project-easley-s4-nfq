import React, { Component } from 'react';
import './StatusTab.scss';
import PropTypes from 'prop-types';

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
    const {status , selected } = this.props
    return (
      <button onClick={this.onClick} className={`details__tab ${selected}`}>{status}</button>
    );
  }
}

StatusTab.propTypes = {
  status: PropTypes.string,
  selected: PropTypes.string
}
export default StatusTab;
