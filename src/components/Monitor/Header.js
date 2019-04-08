import React, { Component } from "react";
import PropTypes from 'prop-types';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

const themeHeader = createMuiTheme({
  palette: {
    primary: {
    main: '#53abe1',
    contrastText: '#fff',
    },
  secondary: {
    main: '#333333',
    contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: [
    'Roboto',
    'sans-serif'].join(','),
    fontSize: 16
    }
});
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

class Header extends Component {
  render() {

    const {classes} = this.props;
    const {results, dataSize} = this.props;

    return (
      <React.Fragment>
        <CssBaseline>
          <MuiThemeProvider theme={themeHeader}>
            <Grid container className={classes.root} justify="center" alignItems="center" spacing={8}>
              <Grid item xs={11} className={classes.titleContainer}>
                    <Typography variant="h2" color="primary" className={classes.title}>
                      {results[0].source.repository.name}
                    </Typography>
                    <Avatar className={classes.size}>{dataSize}</Avatar>
              </Grid>
          </Grid>
        </MuiThemeProvider>
      </CssBaseline>
    </React.Fragment>
    );
  }
}


Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles (styles)(Header);

