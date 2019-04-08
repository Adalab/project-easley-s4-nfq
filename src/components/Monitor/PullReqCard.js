import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../components/PRcard/PRcard.scss";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  card: {
    height: "120px",
    margin: "5px",
    padding: "10px",
    backgroundColor: "#e0e0e0",
  },
  contentAvatar: {
    maxWidth: "90px"
  },
  avatar: {
    margin: "10px",
    width: "60px",
    height: "60px",
    border: "solid 2px orange"
  },
  content: {
    display: "flex",
    flexDirection: "row"
  },
  namePr: {
    textAlign: "left",
    flexBasis: "unset"
  },
  nameAuthor: {
    textAlign: "left",
    textTransform: "uppercase",
    color: "#29b6f6"
  },
  repos: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  comments: {
    width: "50px"
  },
  reviewersContainer: {
    display: "flex",
    flexDirection: "column"
  },
  reviewersAvatarContainer:{
    display: "flex",
    flexDirection: "row"
  },
  avatarReviewrs: {
    margin: "5px"
  }
});

class PullReqCard extends Component {
  constructor(props) {
    super(props);

    this.getDiffDates = this.getDiffDates.bind(this);
  }
  getDiffDates(date){
    let test = moment().diff(moment(date), 'hours')
  }

  render() {
    const {
      classes,
      authorAvatar,
      title,
      authorName,
      fromBranch,
      toBranch,
      comments,
      reviewers,
      participants,
      date
    } = this.props; 

    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Grid item xs={1} className={classes.contentAvatar}>
            <Avatar
              alt="Remy Sharp"
              src={authorAvatar}
              className={classes.avatar}
            />
          </Grid>

          <Grid item xs={3}>
            <Typography variant="h6" className={classes.nameAuthor}>
              {authorName}
            </Typography>
            <Typography variant="subtitle1" className={classes.namePr}>
              {title}
            </Typography>
          </Grid>

          <Grid item xs={2} className={classes.repos}>
            <Typography variant="subtitle2">{fromBranch}</Typography>{" "}
            <i className="fas fa-arrow-down " />
            <Typography variant="subtitle2">{toBranch}</Typography>
          </Grid>

          <Grid item xs={1} className={classes.comments}>
            <Typography variant="subtitle2">
              <i className="far fa-comment-dots fa-2x" /><br />{comments}
            </Typography>
          </Grid>

          <Grid container xs={2} className={classes.reviewersContainer}>
            <Grid item className={classes.titleReviewers}>
              <Typography variant="subtitle2">
                Reviewers
              </Typography>
            </Grid>
            <Grid item className={classes.reviewersAvatarContainer}>
            {reviewers.map((item, index) => {
              return (
                <Avatar
                  alt=""
                  src={item.links.avatar.href}
                  className={classes.avatarReviewrs}
                />
              );
            })}
            </Grid>
          </Grid>
          <Grid item>
          {participants.map((item => {
            return (
              <div>{item.user.display_name}</div>
            )
          }))}
          </Grid>

          <Grid item xs={2}>
            <Typography variant="subtitle2">
              <div className="date__container">
                {moment(date).format("DD/MM/YYYY hh:mm:ss")}
                <span className="prcard__date">{this.getDiffDates(date)}</span>
              </div>
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

export default withStyles(styles)(PullReqCard);
