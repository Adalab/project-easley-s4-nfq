import React, { Component } from "react";
import PropTypes from 'prop-types';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';

const themeSlider = createMuiTheme({
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
    flexGrow: 1
  }, 
  title:{
    textAlign: "center"
  }
});


class Slider extends Component {
  render() {
    const {classes} = this.props;
      return (
        <React.Fragment>
          <CssBaseline>
            <MuiThemeProvider theme={themeSlider}>
              <Grid container className={classes.root} justify="center" alignItems="center" spacing={16}>
                <Grid item xs={12}>
                  <Typography variant="h1" color="primary" className={classes.title}>
                    Nombre del repositorio
                  </Typography>
                </Grid>
              
              
              </Grid>
            </MuiThemeProvider>
          </CssBaseline>
        </React.Fragment>
      
      );
    }
}

Slider.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles (styles)(Slider);
