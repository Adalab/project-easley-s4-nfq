import React, { Component } from "react";
import User from "../User";
import Reviewers from '../Reviewers';
import "./PRcard.scss";
import { handleDate } from '../../Utils/handleDate';
import moment from 'moment';

class PRcard extends Component {

  render() {
    const { avatar, author, branch, date, reviewers } = this.props;
    console.log ('aqui', reviewers)
    return (
      <div className="prcard__container">
        <div className="dateandcomments__container">
          <div className="date__container">

            {moment(`${date}`).fromNow() === "a day ago"
              || moment(`${date}`).fromNow() === "2 days ago" ? (
                <i className="fas fa-circle green"></i>
              ) : ("")
            }

            {moment(`${date}`).fromNow() === "3 days ago"
              || moment(`${date}`).fromNow() === "4 days ago"
              || moment(`${date}`).fromNow() === "5 days ago" ? (
                <i className="fas fa-circle yellow"></i>
              ) : ("")
            }

            {moment(`${date}`).fromNow() !== "a day ago"
              && moment(`${date}`).fromNow() !== "2 days ago"
              && moment(`${date}`).fromNow() !== "3 days ago"
              && moment(`${date}`).fromNow() !== "4 days ago"
              && moment(`${date}`).fromNow() !== "5 days ago" ? (
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

          {reviewers.map ((rv,index) => {
                return(
                  <div key={index}>
                  <Reviewers
                  rvAvatar= {rv.links.avatar.href}
                  rvName= {rv.display_name}
                  develop = {this.props.develop}
                  />
                  </div>
                )
              })}


          />
        </div>
      </div>
    );
  }
}

export default PRcard;
