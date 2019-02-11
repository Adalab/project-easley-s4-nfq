import React, { Component } from 'react';
import './StatusTab.scss';
import PropTypes from 'prop-types';

class StatusTab extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.addClass = this.addClass.bind(this);
  }

  onClick(event) {
    const { tab, handleTab} = this.props;
    handleTab(tab);

}
  addClass(){
    const {selectedTab, tab} = this.props;
    return selectedTab === tab
      ? "details__tab--selected"
      : ""
  }


  render() {
    const {tab, selectedTab} = this.props
    return (
      <button className={`details__tab ${this.addClass()} ${selectedTab}`} onClick={this.onClick}>{tab}</button>
    );
  }
}

StatusTab.propTypes = {
  status: PropTypes.string,
  selected: PropTypes.string
}
export default StatusTab;
