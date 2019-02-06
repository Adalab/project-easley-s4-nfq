import React, { Component, Fragment } from 'react';
import StatusTab from '../StatusTab';
import PRlist from '../PRlist';
import './DetailsContainer.scss';

class DetailsContainer extends Component {
  render() {
    const { value, pullRequests } = this.props;
    return (
      <Fragment>
        <h2 className="details__title">{value}</h2>
        <select className="details__select">
          <option>OPEN</option>
          <option>MERGED</option>
          <option>DECLINED</option>
        </select>
        <div className="details__wrapper--tab">
          <StatusTab className="tab_open" status="OPEN" selected="details__tab--selected " />
          <StatusTab className="tab_merged" status="MERGED" selected="" />
          <StatusTab className="tab_declined" status="DECLINED" selected="" />
        </div>
        <PRlist pullRequests={pullRequests} />
      </Fragment>
    );
  }
}

export default DetailsContainer;
