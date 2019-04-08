import React, { Component } from "react";
import PropTypes from 'prop-types';

import { MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const themeLoading = createMuiTheme({
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
});

const styles = theme => ({
  progress:{
    textAlign: "center"
  }
});



class Loading extends Component {

render(){
  const {classes} = this.props;
    return(
      <MuiThemeProvider theme={themeLoading}>
        <div>
          <CircularProgress className={classes.progress} color="primary"/>
        </div>
      </MuiThemeProvider>
     
    )}
  };

Loading.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles (styles)(Loading);