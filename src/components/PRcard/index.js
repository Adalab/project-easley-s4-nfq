import React, { Component } from "react";
import User from "../User";
import "./PRcard.scss";
import {handleDate} from '../../Utils/handleDate';

class PRcard extends Component {

  render() {
    const {avatar, author, branch, date} = this.props;
    console.log('props pr card',date)
    return (
      <div className="prcard__container">
        <div className="dateandcomments__container">
          <span className="prcard__date">{handleDate(date).date}</span>
          <span className="prcard__numcomments">
            4<i className="far fa-comment" />
          </span>
        </div>
        <h3 className="prcard__title">PR title</h3>
        <div className="users__container">
        <User
        avatar={avatar}
        author={author}
        branch={branch}/>
          <i className="fas fa-arrow-right" />

        </div>
      </div>
    );
  }
}

export default PRcard;
