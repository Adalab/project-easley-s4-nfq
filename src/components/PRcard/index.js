import React, { Component } from "react";
import User from "../User";
import "./PRcard.scss";

class PRcard extends Component {
  render() {
    console.log('comments',this.props.comments);
    return (
      <div className="prcard__container">
        <div className="dateandcomments__container">
          <span className="prcard__date">22/01/2019</span>
          <a href={`https://bitbucket.org/${this.props.repository}/pull-requests/${this.props.id}/_/diff`} rel="noopener noreferrer" target="_blank">
          <span className="prcard__numcomments">
            {this.props.comments}<i className="far fa-comment" />
          </span></a>
        </div>
        <h3 className="prcard__title">{this.props.title}</h3>
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
