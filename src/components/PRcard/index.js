import React, { Component } from 'react';
import User from '../User';
import Reasons from '../Reasons';

class PRcard extends Component {
    render() {
        return (
            <div>
                <span>22/01/2019</span>
                <a href={`https://bitbucket.org/atlassian/${this.props.name}/pull-requests/${this.props.id}/_/diff`} rel="noopener noreferrer" target="_blank">
                <span>
                {this.props.commentsCount}
                <i class="far fa-comment"></i>
                </span>
                </a>

                <h3>PR title</h3>
                <i class="fas fa-arrow-right"></i>
                <User />
                <User />
                <Reasons />
            </div>
        );
    }
}

export default PRcard;
