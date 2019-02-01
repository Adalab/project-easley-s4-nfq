import React, { Component, Fragment } from 'react';
import User from '../User';

class Reasons extends Component {
    render() { 
        return ( 
            <Fragment>
            <div>Show reasons <i class="fas fa-angle-down"></i></div>
            <div>
            <h3>REASONS:</h3>
            <User />
            <p>
                
            </p>
            </div>
            </Fragment>
        );
    }
}

export default Reasons;