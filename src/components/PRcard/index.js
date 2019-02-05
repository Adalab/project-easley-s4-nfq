import React, { Component } from "react";
import User from "../User";
import "./PRcard.scss";
import { handleDate } from '../../Utils/handleDate';
import moment from 'moment';

class PRcard extends Component {

  render() {
    const { avatar, author, branch, date } = this.props;
    return (
      <div className="prcard__container">
        <div className="dateandcomments__container">
          <div className="date__container">

            {moment(`${date}`).fromNow() === "a day ago"
              || moment(`${date}`).fromNow() === "two days ago" ? (
                <i className="fas fa-circle green"></i>
              ) : ("")
            }

            {moment(`${date}`).fromNow() === "three days ago"
              || moment(`${date}`).fromNow() === "four days ago"
              || moment(`${date}`).fromNow() === "five days ago" ? (
                <i className="fas fa-circle yellow"></i>
              ) : ("")
            }

            {moment(`${date}`).fromNow() !== "a day ago"
              && moment(`${date}`).fromNow() !== "two days ago"
              && moment(`${date}`).fromNow() !== "three days ago"
              && moment(`${date}`).fromNow() !== "four days ago"
              && moment(`${date}`).fromNow() !== "five days ago" ? (
                <i className="fas fa-circle red"></i>
              ) : ("")
            }

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
            branch={branch} />
          <i className="fas fa-arrow-right" />

          <User />
        </div>
      </div>
    );
  }
}

export default PRcard;
