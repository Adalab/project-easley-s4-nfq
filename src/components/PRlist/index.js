import React, { Component } from 'react';
import PRcard from '../PRcard';

class PRlist extends Component {
  render() {
    const { pullRequests, handleDate } = this.props;
    return (
      <ul>
        {pullRequests.map((item, index) => {
          return (
            <li key={index}>
              <PRcard
              repository={item.destination.repository.full_name}
              id={item.id}
              avatar={item.author.links.avatar.href}
              author={item.author.display_name}
              branch={item.source.branch.name}
              title={item.title}
              comments={item.comment_count}
              handleDate={handleDate}
              date={item.created_on}
              reviewers = {item.reviewers}
              develop = {item.destination.branch.name}
              />
            </li>
          )
        })}
      </ul>


    );
  }
}

export default PRlist;
