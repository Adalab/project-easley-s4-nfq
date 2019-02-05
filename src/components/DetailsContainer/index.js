import React, { Component, Fragment } from 'react';
import StatusTab from '../StatusTab';
import PRlist from '../PRlist';
import './DetailsContainer.scss';

class DetailsContainer extends Component {
    render() {
      const {value, pullRequests} = this.props;
        return (
            <Fragment>
            <h2 className="details__title">{value}</h2>
            <select className="details__select">
                <option>OPEN</option>
                <option>MERGED</option>
                <option>DECLINED</option>
            </select>
            <div className="details__wrapper--tab">
            <StatusTab status="OPEN" selected="details__tab--selected "/>
            <StatusTab status="MERGED" selected="" />
            <StatusTab status="DECLINED" selected=""/>
            </div>
            <PRlist pullRequests={pullRequests}/>
            </Fragment>
        );
    }
}

export default DetailsContainer;
