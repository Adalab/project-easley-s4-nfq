import React, { Component } from "react";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import PullReqCard from "./PullReqCard";

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
  }
});
class PullReqList extends Component {
  render() {

    const {classes , results} = this.props;

    return (
      <Grid container className={classes.root} justify="center" alignItems="center" spacing={8}>
        {results.map(item => {
          return (
            <Grid key={item.id} item xs={12}>
              <PullReqCard 
                authorAvatar={item.author.links.avatar.href}
                title={item.title}
                authorName={item.author.display_name}
                fromBranch={item.source.branch.name}
                toBranch={item.destination.branch.name}
                comments={item.comment_count}
                reviewers={item.reviewers}
                participants={item.participants}
                date={item.updated_on}
                id={item.id}
              />
            </Grid>
          )
        })}
      </Grid>
    );
  }
}

PullReqList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles (styles)(PullReqList);
