import React, { Component, Fragment } from "react";
import './Reviewers.scss';
import PropTypes from 'prop-types';


class Reviewers extends Component {
  render() {
    const { reviewers } = this.props;
    if (reviewers.length === 1) {
      return (
        <Fragment>
          {reviewers.map((rv, index) => {
            return (
              <div className="app--card-reviewer" key={index}>
                <img className="app--card-image-reviewer" src={rv.links.avatar.href} alt={rv.display_name} />
                <h4 className="app--card-name-reviewer">{rv.display_name}</h4>
                <h4 className="app--card-develop">{this.props.develop}</h4>
              </div>
            );
          })}
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <div className="app--card-reviewer">
          <img className="app--card-image-reviewers" src="https://image.flaticon.com/icons/svg/9/9463.svg" alt = ""/>
          {reviewers.map((rv, index) => {
            return (
              <div key={index}>
                <h4 className="app--card-name-reviewers">{rv.display_name}</h4>
              </div>
            );
          })}
          <h4 className="app--card-develop">{this.props.destinationbranch}</h4>
          </div>
        </Fragment>
      );
    }
  }
}

Reviewers.PropTypes = {
  reviewers: PropTypes.array,
  destinationbranch: PropTypes.string
}
export default Reviewers;
