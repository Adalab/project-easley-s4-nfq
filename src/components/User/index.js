import React, { Component, Fragment } from 'react';
import './User.scss';
import PropTypes from 'prop-types';
import { handleDate } from "../../Utils/handleDate";

class User extends Component {
  render() {
    const {avatar, author, branch, date, reasonClass} =  this.props
    return (
      <Fragment>
        <div className={`app--card-user ${reasonClass}`}>
              <img
                className="app--card-image"
                src={avatar}
                alt={author || "reviewers"}
              />
          <h4 className="app--card-name">{author || "reviewers"}</h4>
          <h4 className="app--card-branch">{branch || handleDate(date).date || "Develop"}</h4>
        </div>
      </Fragment>
    )
  }
}

User.propTypes = {
  avatar: PropTypes.string,
  author: PropTypes.string,
  branch: PropTypes.string,
  isLoading: PropTypes.bool
}

export default User;
