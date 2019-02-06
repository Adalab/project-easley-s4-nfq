import React, { Component } from "react";
import User from "../User";
import "./PRcard.scss";
import { handleDate } from '../../Utils/handleDate';

class PRcard extends Component {

  render() {
    const { avatar, author, branch, date } = this.props;
    return (
      <div className="prcard__container">
        <div className="dateandcomments__container">
          <span className="prcard__date">{handleDate(date).date}</span>
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
