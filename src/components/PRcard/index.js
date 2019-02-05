import React, { Component } from "react";
import User from "../User";
import "./PRcard.scss";
import { handleDate } from '../../Utils/handleDate';
//import Moment from 'react-moment';
import moment from 'moment';

class PRcard extends Component {

  render() {
    const { avatar, author, branch, date } = this.props;
    console.log('date', date)
    console.log('moments', moment(`${date}`).fromNow())
    return (
      <div className="prcard__container">
        <div className="dateandcomments__container">
          <div className="date__container">

            {/* {moment(`${date}`).fromNow() === "a day ago" &
              <i className="fas fa-circle green"></i>
              || moment(`${date}`).fromNow() === "two days ago" &
              <i className="fas fa-circle green"></i>
              || moment(`${date}`).fromNow() === "three days ago" &
              <i className="fas fa-circle yellow"></i>
              || moment(`${date}`).fromNow() === "four days ago" &
              <i className="fas fa-circle yellow"></i>
              || moment(`${date}`).fromNow() === "five days ago" &
              <i className="fas fa-circle yellow"></i>
              ||
              <i className="fas fa-circle red"></i>
            } */}

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

            {/* si es a day ago or two days ago */}
            {/* si es three days ago or four days ago or five days ago amarillo */}
            {/* <i className="fas fa-circle"></i> */}
            {/* {handleDate(date).date} */}
            <span className="prcard__date">{handleDate(date).date}</span>
            {/* <span className={moment(`${date}`).fromNow() === "a day ago" || "two days ago" ? "prcard__date green" : "prcard__date"}>{handleDate(date).date}</span> */}
            {/* <span>{moment("20111031", "YYYYMMDD").fromNow()}</span> */}
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
