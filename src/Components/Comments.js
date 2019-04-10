import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  comments: {
    width: "35px",
    margin: "0 20px"
  }
});

class Comments extends Component {
  render() {
    const { classes, comments } = this.props; 

      return (
        <Grid item xs={1} className={classes.comments}>
          <Typography variant="subtitle2" color="secondary">
            <i className="far fa-comment-dots fa-2x"/><br/>{comments}
          </Typography>
        </Grid>

      );
    }
  }

Comments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Comments);
