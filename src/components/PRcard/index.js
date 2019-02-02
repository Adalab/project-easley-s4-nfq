import React, { Component } from 'react';
import User from '../User';
import Reasons from '../Reasons';
import './PRcard.scss';

class PRcard extends Component {
    render() {
        return (
            <div>
                <span>22/01/2019</span>
                <span>4<i className="far fa-comment"></i></span>
                <h3>PR title</h3>
                <i className="fas fa-arrow-right"></i>
                <User />
                <User />
                <Reasons />
            </div>
        );
    }
}

export default PRcard;
