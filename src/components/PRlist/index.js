import React, { Component } from 'react';
import PRcard from '../PRcard';
import PropTypes from 'prop-types';


class PRlist extends Component {
  render() {
    const { pullRequests, handleDate, isLoading } = this.props;
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
              destinationbranch = {item.destination.branch.name}
              isLoading={isLoading}
              />
            </li>
          )
        })}
      </ul>


    );
  }
}

PRlist.propTypes = {
  pullRequests: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool,
}
export default PRlist;
