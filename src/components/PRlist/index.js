import React, { Component } from 'react';
import PRcard from '../PRcard';

class PRlist extends Component {
    render() {
        return (
            <ul>
                <PRcard name={this.props.name} id={this.props.id} />
            </ul>
        );
    }
}

export default PRlist;
