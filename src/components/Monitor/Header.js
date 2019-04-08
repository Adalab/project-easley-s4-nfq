import React, { Component } from "react";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  title: {
    textAlign: "center",
    marginTop: "10px",
    color: "#29b6f6",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "10px",
    justifyContent: "center",
    alignItems: "center"
  },
  size: {
    backgroundColor: "#ff9800",
    color: "white",
    fontSize: "25px",
    maxWidth: "100px",
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
     
      <Grid container className={classes.root} justify="center" alignItems="center" spacing={8}>
        <Grid item xs={11} className={classes.titleContainer}>
              <Typography variant="h3" className={classes.title}>
                {results[0].source.repository.name}
              </Typography>
              <Avatar className={classes.size}>{dataSize}</Avatar>
        </Grid>
      </Grid>
    );
  }
}


Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles (styles)(Header);

