import React, { Component } from "react";
import User from "../User";
import "./PRcard.scss";
import {handleDate} from '../../Utils/handleDate';
//import Moment from 'react-moment';
import moment from 'moment';

class PRcard extends Component {

  render() {
    const {avatar, author, branch, date} = this.props;
    console.log('date',date)
    console.log('moments',moment(`${date}`).fromNow())
    return (
      <div className="prcard__container">
        <div className="dateandcomments__container">
        <i className="fas fa-circle"></i>
        {handleDate(date).date}
          {/* <span className={moment(`${date}`).fromNow() === "a day ago" || "two days ago" ? "prcard__date green" : "prcard__date"}>{handleDate(date).date}</span> */}
          {/* <span>{moment("20111031", "YYYYMMDD").fromNow()}</span> */}
          {/* <Moment fromNow ago>{date}</Moment> */}
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
        branch={branch}/>
          <i className="fas fa-arrow-right" />

          <User  />
        </div>
      </div>
    );
  }
}

export default PRcard;
