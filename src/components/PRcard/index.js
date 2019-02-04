import React, { Component } from "react";
import User from "../User";
import "./PRcard.scss";

class PRcard extends Component {
  render() {
    return (
      <div className="prcard__container">
        <div className="dateandcomments__container">
          <span className="prcard__date">22/01/2019</span>
          <span className="prcard__numcomments">
            4<i className="far fa-comment" />
          </span>
        </div>
        <h3 className="prcard__title">PR title</h3>
        <div className="users__container">
        <User
        avatar={this.props.avatar}
        author={this.props.author}
        branch={this.props.branch}/>
          <i className="fas fa-arrow-right" />

        </div>
      </div>
    );
  }
}

export default PRcard;
