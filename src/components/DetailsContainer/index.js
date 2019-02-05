import React, { Component, Fragment } from 'react';
import StatusTab from '../StatusTab';
import PRlist from '../PRlist';
import './DetailsContainer.scss';

class DetailsContainer extends Component {

    render() {
        return (
            <Fragment>
            <h2 className="details__title">{this.props.value}</h2>
            <select className="details__select">
                <option>OPEN</option>
                <option>MERGED</option>
                <option>DECLINED</option>
            </select>
            <div className="details__wrapper--tab">
            <StatusTab status="OPEN" />
            <StatusTab status="MERGED" />
            <StatusTab status="DECLINED" />
            </div>
            <PRlist pullRequests={this.props.pullRequests}/>
            </Fragment>
        );
    }
}

export default DetailsContainer;
