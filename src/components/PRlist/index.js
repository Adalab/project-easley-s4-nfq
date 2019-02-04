import React, { Component } from 'react';
import PRcard from '../PRcard';

class PRlist extends Component {
    render() {
        return (
            <ul>
                <PRcard pullRequests={this.props.pullRequests}/>
            </ul>
        );
    }
}

export default PRlist;
