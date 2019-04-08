import React, { Component } from "react";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import PullReqCard from "./PullReqCard";


const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  title: {
    textAlign: "center",
    marginTop: "10px"
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "10px",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    height: "120px",
    margin: "10px",
    backgroundColor: "lightGreen",
    border: "1px solid black"
  },
  contentAvatar: {
    maxWidth: "90px",

  },
  avatar: {
    margin: "10px",
    width: "60px",
    height: "60px"

  },
  content: {
    display: "flex",
    flexDirection: "row"
  },
  namePr:{
    textAlign: "left",
    flexBasis: "unset"
  },
  nameAuthor:{
    textAlign: "left",
    textTransform: "uppercase",
  },
  repos:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  comments:{
    width: "50px"
  },
  reviewrsContainer:{
    display: "flex",
    flexDirection: "row",
  },
  avatarReviewrs: {
    margin: "5px"
  },
  size: {
    backgroundColor: "blue",
    color: "white",
    maxWidth: "100px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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
                date={item.created_on}
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
