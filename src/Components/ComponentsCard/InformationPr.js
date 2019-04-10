import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  infoContainer:{
    width: "200px"
  },
  nameAuthor: {
    textAlign: "left",
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: "20px"
  },
  namePr: {
    textAlign: "left",
    flexBasis: "unset",
    overflow: "hidden",
    whiteSpace:"nowrap",
    textOverflow: "ellipsis"
  },
  id: {
    textAlign: "left",
    flexBasis: "unset",
    fontWeight: "bold"
  }
});

class InformationPr extends Component {
  render() {
    const { classes, authorName, title, id  } = this.props; 

      return (
        <Grid item xs={3} className={classes.infoContainer}>
          <Typography variant="subtitle2" color="primary" className={classes.nameAuthor}>
            {authorName}
          </Typography>
          <Typography variant="body2" color="secondary" className={classes.namePr}>
            {title}
          </Typography>
          <Typography variant="subtitle2" color="secondary" className={classes.id}>
            #{id}
          </Typography>
        </Grid>
      );
    }
  }

InformationPr.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InformationPr);
