import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  authorAvatarContainer: {
    maxWidth: "90px"
  },
  authorAvatar: {
    margin: "10px",
    width: "60px",
    height: "60px",
  },
});

class AuthorAvatar extends Component {
  render() {
    const { classes,authorAvatar } = this.props; 

    return (
      <Grid item xs={1} className={classes.authorAvatarContainer}>
        <Avatar
          alt="Author's image"
          src={authorAvatar}
          className={classes.authorAvatar}
        />
      </Grid>
    );
  }
}

AuthorAvatar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AuthorAvatar);
