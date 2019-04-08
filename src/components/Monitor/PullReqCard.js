import React, { Component } from "react";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';


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
class PullReqCard extends Component {
  render() {

    const {classes , authorAvatar, title , authorName ,fromBranch ,toBranch , comments , reviewers , date } = this.props;

    return (
     
      <Card className={classes.card}>
        <CardContent className={classes.content}>
        
          <Grid item xs={1} className={classes.contentAvatar}>
            <Avatar alt="Remy Sharp" src={authorAvatar} className={classes.avatar}/>
          </Grid>

          <Grid item xs={3}>
            <Typography variant="subtitle1" className={classes.namePr}>
              {title}
            </Typography>
            <Typography variant="subtitle2" className={classes.nameAuthor}>
              {authorName}
            </Typography>
          </Grid>

          <Grid item xs={2} className={classes.repos}>
            <Typography variant="subtitle2">
              {fromBranch}
            </Typography> <i className="fas fa-arrow-down "></i>
            <Typography variant="subtitle2">
              {toBranch}
            </Typography>
          </Grid>

          <Grid item xs={1} className={classes.comments}>
            <Typography variant="subtitle2">
            <i className="far fa-comment-dots fa-2x"></i> <br/> {comments}
            </Typography>
          </Grid>

          <Grid item xs={2} className={classes.reviewrsContainer}>
            {
              reviewers.map((item,index) => {
                return(
                  <Avatar alt="Remy Sharp" src={item.links.avatar.href} className={classes.avatarReviewrs} />
                )
              })
            }
          </Grid>

          <Grid item xs={2}>
            <Typography variant="subtitle2">
              {date}
            </Typography>
          </Grid>

        </CardContent>
      </Card>
                 
    );
  }
}


PullReqCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles (styles)(PullReqCard);
