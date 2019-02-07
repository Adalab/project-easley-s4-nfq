import React, { Component } from 'react';
import PRcard from '../PRcard';

class PRlist extends Component {
  render() {
    const { pullRequests, handleDate, isLoading } = this.props;
    return (
      <ul>
        {pullRequests.map((item, index) => {
          return (
            <li key={index}>
              <PRcard
              repository={item.repository}
              id={item.id}
              avatar={item.avatar}
              author={item.author}
              branch={item.branch}
              title={item.title}
              comments={item.comments_number}
              handleDate={handleDate}
              date={item.date}
              isLoading={isLoading}
              />
            </li>
          )
        })}
      </ul>


    );
  }
}

export default PRlist;
