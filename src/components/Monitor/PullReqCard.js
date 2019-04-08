import React, { Component } from "react";
import PropTypes from "prop-types";
import { handleDate } from "../../Utils/handleDate";
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
    margin: "10px",
    backgroundColor: "lightGrey"
  },
  red: {
    backgroundColor: "red"
  },
  contentAvatar: {
    maxWidth: "90px"
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
  namePr: {
    textAlign: "left",
    flexBasis: "unset"
  },
  nameAuthor: {
    textAlign: "left",
    textTransform: "uppercase"
  },
  repos: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  comments: {
    width: "50px"
  },
  reviewrsContainer: {
    display: "flex",
    flexDirection: "row"
  },
  avatarReviewrs: {
    margin: "5px"
  }
});

class PullReqCard extends Component {
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
            <Typography variant="subtitle1" className={classes.namePr}>
              {title}
            </Typography>
            <Typography variant="subtitle2" className={classes.nameAuthor}>
              {authorName}
            </Typography>
          </Grid>

          <Grid item xs={2} className={classes.repos}>
            <Typography variant="subtitle2">{fromBranch}</Typography>{" "}
            <i className="fas fa-arrow-down " />
            <Typography variant="subtitle2">{toBranch}</Typography>
          </Grid>

          <Grid item xs={1} className={classes.comments}>
            <Typography variant="subtitle2">
              <i className="far fa-comment-dots fa-2x" /> <br /> {comments}
            </Typography>
          </Grid>

          <Grid item xs={2} className={classes.reviewrsContainer}>
            {reviewers.map((item, index) => {
              return (
                <Avatar
                  alt="Remy Sharp"
                  src={item.links.avatar.href}
                  className={classes.avatarReviewrs}
                />
              );
            })}
          </Grid>

          <Grid item xs={2}>
            <Typography variant="subtitle2">
              <div className="date__container">
                {moment(`${date}`).fromNow() === "a day ago" ||
                moment(`${date}`).fromNow() === "2 days ago" ? (
                  <i className="fas fa-circle green" />
                ) : (
                  ""
                )}

                {moment(`${date}`).fromNow() === "3 days ago" ||
                moment(`${date}`).fromNow() === "4 days ago" ||
                moment(`${date}`).fromNow() === "5 days ago" ? (
                  <i className="fas fa-circle yellow" />
                ) : (
                  ""
                )}

                {moment(`${date}`).fromNow() !== "a day ago" &&
                moment(`${date}`).fromNow() !== "2 days ago" &&
                moment(`${date}`).fromNow() !== "3 days ago" &&
                moment(`${date}`).fromNow() !== "4 days ago" &&
                moment(`${date}`).fromNow() !== "5 days ago" ? (
                  <i className="fas fa-circle red" />
                ) : (
                  ""
                )}

                <span className="prcard__date">{handleDate(date).date}</span>
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
