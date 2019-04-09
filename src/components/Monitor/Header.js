import React, { Component } from "react";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
  titleRepo: {
    textAlign: "center",
    marginTop: "10px",
    textTransform: "uppercase",
    fontWeight: "bold"
  },
  size: {
    backgroundColor: "#ff9800",
    color: "white",
    fontSize: "25px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin:"25px"
  }
});
class Header extends Component {
  render() {
    const {classes} = this.props;
    const {results, dataSize} = this.props;
    return (
      <Grid item xs={12} className={classes.titleContainer}>
        <Typography variant="h3" color="primary" className={classes.titleRepo}>
          {results[0].source.repository.name}
        </Typography>
        <Avatar className={classes.size}>{dataSize}</Avatar>
      </Grid>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles (styles)(Header);

