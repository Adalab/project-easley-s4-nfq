import React, { Component, Fragment } from "react";

class Reviewers extends Component {
  render() {
    const { reviewers } = this.props;
    console.log("develop", this.props.develop);
    if (reviewers.length === 1) {
      return (
        <Fragment>
          {reviewers.map((rv, index) => {
            return (
              <div key={index}>
                <img src={rv.links.avatar.href} alt={rv.display_name} />
                <h4>{rv.display_name}</h4>
                <h4>{this.props.destinationbranch}</h4>
              </div>
            );
          })}
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <img src="https://image.flaticon.com/icons/svg/9/9463.svg" alt = "reviewers photo"/>
          {reviewers.map((rv, index) => {
            return (
              <div key={index}>
                <h4>{rv.display_name}</h4>
              </div>
            );
          })}
          <h4>{this.props.destinationbranch}</h4>
        </Fragment>
      );
    }
  }
}

export default Reviewers;
