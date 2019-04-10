import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  dateContainer:{
    marginLeft: "100px",
    display: "flex",
    flexDirection:"column",
    alignItems: "center"
  },
  date: {
    textAlign: "center",
    paddingBottom:"10px",
    fontWeight: "bold",
  },
  badge: { 
    top: '30%', 
    right: -3, 
    backgroundColor: "green",
    color: "white"
  },
  circleStatus:{
    width: "20px",
    height:"20px",
    borderRadius: "50%",
  },
  green: {
    backgroundColor:"green"
  },
  yellow: {
    backgroundColor:"yellow"
  },
  red: {
    backgroundColor:"red"
  }
});

class Date extends Component {
  constructor(props) {
    super(props);
    
    this.getDiffDates = this.getDiffDates.bind(this);
  }

  getDiffDates(date){
    let test = moment().diff(moment(date), 'hours');
    
    if(test < 24){
      return(
        <div className={`${this.props.classes.green} ${this.props.classes.circleStatus}`}></div>
      )
    }
    else if(test >= 24 && test < 48){
      return(
        <div className={`${this.props.classes.yellow} ${this.props.classes.circleStatus}`}></div>
       )
    }
    else{
      return(
        <div className={`${this.props.classes.red} ${this.props.classes.circleStatus}`}></div>
      )
    }
  }

  render() {
    const { classes,date } = this.props; 

      return (
            <Grid container xs={2} className={classes.dateContainer}>
              <Grid item>
                <Typography variant="subtitle2" color="secondary">
                  <div className={classes.date}>
                    {moment(date).format("DD/MM/YYYY hh:mm:ss")}
                  </div>
                </Typography>
              </Grid>
              <Grid item>
                <span> {this.getDiffDates(date)} </span>
              </Grid>
            </Grid>
      );
    }
  }

Date.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Date);
