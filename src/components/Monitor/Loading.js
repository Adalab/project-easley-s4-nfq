import React, { Component } from "react";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress:{
    textAlign: "center"
  }
});


class Loading extends Component {

render(){
  const {classes} = this.props;
    return(
      <div>
        <CircularProgress className={classes.progress} color="primary"/>
      </div>
    )}
  };

Loading.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles (styles)(Loading);