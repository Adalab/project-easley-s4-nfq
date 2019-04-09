import React, { Component } from "react";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress:{
    textAlign: "center"
  },
  containerLoading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});
class Loading extends Component {
  render(){
    const {classes} = this.props;
      return(
        <div className={classes.containerLoading}>
          <CircularProgress className={classes.progress} color="primary"/>
        </div>
      )}
    }

Loading.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles (styles)(Loading);