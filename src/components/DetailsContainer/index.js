import React, { Component, Fragment } from 'react';
import StatusTab from '../StatusTab';
import PRlist from '../PRlist';
import './DetailsContainer.scss';

class DetailsContainer extends Component {
    render() {
      const {value, pullRequests, tab, handleTab, hideTab, isLoading} = this.props;
      const hideTabResult = hideTab(tab);
        return (
            <Fragment>
            <h2 className="details__title">{value}</h2>
            <select className="details__select">
                <option>OPEN</option>
                <option>MERGED</option>
                <option>DECLINED</option>
            </select>
            <div className="details__wrapper--tab">
            <StatusTab
            tab="OPEN"
            handleTab={handleTab}
            hideTabResult={hideTabResult}
            status="OPEN"
            selected={`${hideTabResult}`}/>
            <StatusTab
            tab="MERGED"
            handleTab={handleTab}
            hideTabResult={hideTabResult}
            status="MERGED"
            selected={`${hideTabResult}`} />
            <StatusTab
            tab="DECLINED"
            handleTab={handleTab}
            hideTabResult={hideTabResult}
            status="DECLINED"
            selected={`${hideTabResult}`}/>
            </div>
            <PRlist
            pullRequests={pullRequests}
            isLoading={isLoading}
            />
            </Fragment>
        );
    }
}

export default DetailsContainer;
