import React, { Component } from 'react';
import './StatusTab.scss';

class StatusTab extends Component {

    render() {
        return (
            <button className={`details__tab ${this.props.selected}`}>{this.props.status}</button>
        );
    }
}

export default StatusTab;
