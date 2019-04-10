import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  titleReviewers:{
    fontWeight: "bold",
  },
  reviewersContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "0 20px"
  },
  reviewersAvatarContainer:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  avatarReviewrs: {
    margin: "5px",
  },
});

class Reviewers extends Component {
  render() {
    const { classes,reviewers } = this.props; 

    return (
      <Grid container xs={2} className={classes.reviewersContainer}>
        <Grid item>
          <Typography className={classes.titleReviewers} variant="subtitle2" color="secondary">
            Reviewers
          </Typography>
        </Grid>
        <Grid item className={classes.reviewersAvatarContainer}>
          {reviewers.map((item, index) => {
            return (
              <Avatar
                key={index}
                alt="Reviewer's image"
                src={item.links.avatar.href}
                className={classes.avatarReviewrs}
              />
            );
          })}
        </Grid>
      </Grid>

    );
  }
}

Reviewers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Reviewers);
