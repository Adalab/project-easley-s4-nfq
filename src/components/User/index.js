import React, { Component, Fragment } from 'react';
import './User.scss';
import Loader from '../Loader';
import PropTypes from 'prop-types';

class User extends Component {
  render() {
    return (
      <Fragment>
        <div className="app--card-user">
          {this.props.isLoading ? (
            <Loader />
          ) : (
              <img
                className="app--card-image"
                src={this.props.avatar}
                alt={this.props.author || "reviewers"}
              />
            )}
          <h4 className="app--card-name">{this.props.author || "reviewers"}</h4>
          <h4 className="app--card-branch">{this.props.branch || "Develop"}</h4>
        </div>
      </Fragment>
    )
  }
}

export default User;
