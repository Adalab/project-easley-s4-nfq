import React, { Component, Fragment } from "react";
import StatusTab from "../StatusTab";
import PRlist from "../PRlist";
import "./DetailsContainer.scss";
import ButtonPagination from "../ButtonPagination";
import PropTypes from "prop-types";

class DetailsContainer extends Component {
  componentDidMount() {
    this.props.getRepository(null, "OPEN");
    this.props.getToken();
  }
  render() {
    const {
      value,
      tab,
      pullRequests,
      handleTab,
      isLoading,
      getNextPullRequests,
      getPreviousPullRequests,
      uriNextPage,
      uriPrevPage
    } = this.props;
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
            selectedTab={tab}
            position="details__tab--left"
          />

          <StatusTab
            tab="MERGED"
            handleTab={handleTab}
            selectedTab={tab}
          />

          <StatusTab
            tab="DECLINED"
            handleTab={handleTab}
            selectedTab={tab}
            position="details__tab--right"
          />
        </div>

        <ButtonPagination
          getNextPullRequests={getNextPullRequests}
          getPreviousPullRequests={getPreviousPullRequests}
          uriNextPage={uriNextPage}
          uriPrevPage={uriPrevPage}
        />

        <PRlist pullRequests={pullRequests} isLoading={isLoading} />

        <ButtonPagination
          getNextPullRequests={getNextPullRequests}
          getPreviousPullRequests={getPreviousPullRequests}
          uriNextPage={uriNextPage}
          uriPrevPage={uriPrevPage}
        />

      </Fragment>
    );
  }
}

DetailsContainer.propTypes = {
  pullRequests: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.string,
  isLoading: PropTypes.bool
};

export default DetailsContainer;
