import React, { Component, Fragment } from "react";
import User from "../User";
import Reviewers from "../Reviewers";
import "./PRcard.scss";
import { handleDate } from "../../Utils/handleDate";
import moment from "moment";
import PropTypes from 'prop-types';
import Loader from '../Loader';
import Reasons from "../Reasons";

class PRcard extends Component {
  render() {
    const { avatar, author, branch, date, isLoading, reviewers } = this.props;
    return (
      <div className="prcard__container">
        {this.props.isLoading ? (
          <Loader />
        ) : (
            <Fragment>
              <div className="dateandcomments__container">
                <div className="date__container">
                  {moment(`${date}`).fromNow() === "a day ago" ||
                    moment(`${date}`).fromNow() === "2 days ago" ? (
                      <i className="fas fa-circle green" />
                    ) : (
                      ""
                    )}

                  {moment(`${date}`).fromNow() === "3 days ago" ||
                    moment(`${date}`).fromNow() === "4 days ago" ||
                    moment(`${date}`).fromNow() === "5 days ago" ? (
                      <i className="fas fa-circle yellow" />
                    ) : (
                      ""
                    )}

                  {moment(`${date}`).fromNow() !== "a day ago" &&
                    moment(`${date}`).fromNow() !== "2 days ago" &&
                    moment(`${date}`).fromNow() !== "3 days ago" &&
                    moment(`${date}`).fromNow() !== "4 days ago" &&
                    moment(`${date}`).fromNow() !== "5 days ago" ? (
                      <i className="fas fa-circle red" />
                    ) : (
                      ""
                    )}

                  <span className="prcard__date">{handleDate(date).date}</span>
                </div>
                <a
                  href={`https://bitbucket.org/${
                    this.props.repository
                    }/pull-requests/${this.props.id}/_/diff`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="prcard__numcomments">
                    {this.props.comments}
                    <i className="far fa-comment" />
                  </span>
                </a>
              </div>
              <h3 className="prcard__title">{this.props.title}</h3>
              <div className="users__container">
                <User
                  avatar={avatar}
                  author={author}
                  branch={branch}
                  isLoading={isLoading}
                />
                <i className="fas fa-arrow-right" />
                <Reviewers
                  reviewers={reviewers}
                  destinationbranch={this.props.destinationbranch}
                />
              </div>
              <div>
                <Reasons reason={this.props.reason} state={this.props.state}/>
              </div>
            </Fragment>
          )}
      </div>
    );
  }
}

PRcard.propTypes = {
  repository: PropTypes.string,
  id: PropTypes.number,
  avatar: PropTypes.string,
  author: PropTypes.string,
  branch: PropTypes.string,
  title: PropTypes.string,
  comments: PropTypes.number,
  handleDate: PropTypes.func,
  date: PropTypes.string,
  reviewers: PropTypes.array,
  destinationbranch: PropTypes.string,
  isLoading: PropTypes.bool,
}

export default PRcard;
