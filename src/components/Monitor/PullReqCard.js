import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Badge from '@material-ui/core/Badge';

import moment from "moment";

const styles = theme => ({
  card: {
    height: "120px",
    margin: "5px",
    padding: "10px",
    backgroundColor: "#e0e0e0",
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
  },
  authorAvatarContainer: {
    maxWidth: "90px"
  },
  authorAvatar: {
    margin: "10px",
    width: "60px",
    height: "60px",
    border: "solid 2px orange"
  },
  nameAuthor: {
    textAlign: "left",
    textTransform: "uppercase",
    color: "#29b6f6"
  },
  namePr: {
    textAlign: "left",
    flexBasis: "unset"
  },
  repos: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  comments: {
    width: "50px"
  },
  reviewersContainer: {
    display: "flex",
    flexDirection: "column"
  },
  reviewersAvatarContainer:{
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  avatarReviewrs: {
    margin: "5px",
  },
  dateContainer:{
    marginLeft: "100px",
    display: "flex",
    flexDirection:"column",
    alignItems: "center"
  },
  date: {
    textAlign: "center",
    paddingBottom:"25px"
  },
  badge: { 
    top: '30%', 
    right: -3, 
    backgroundColor: "#29b6f6"
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

class PullReqCard extends Component {
  constructor(props) {
    super(props);
    

    this.getDiffDates = this.getDiffDates.bind(this);
  }
  getDiffDates(date){
    let test = moment().diff(moment(date), 'hours');
    
    console.log(date," ",test)
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
    const {
      classes,
      authorAvatar,
      title,
      authorName,
      fromBranch,
      toBranch,
      comments,
      reviewers,
      participants,
      date,
      id
    } = this.props; 

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid item xs={1} className={classes.authorAvatarContainer}>
            <Avatar
              alt="Remy Sharp"
              src={authorAvatar}
              className={classes.authorAvatar}
            />
          </Grid>

          <Grid item xs={3}>
            <Typography variant="h6" className={classes.nameAuthor}>
              {authorName}
            </Typography>
            <Typography variant="subtitle1" className={classes.namePr}>
              {title}
            </Typography>
            <Typography variant="subtitle1" className={classes.namePr}>
              #{id}
            </Typography>
          </Grid>

          <Grid item xs={2} className={classes.repos}>
            <Typography variant="subtitle2">{fromBranch}</Typography>{" "}
            <i className="fas fa-arrow-down " />
            <Typography variant="subtitle2">{toBranch}</Typography>
          </Grid>

          <Grid item xs={1} className={classes.comments}>
            <Typography variant="subtitle2">
              <i className="far fa-comment-dots fa-2x" /><br />{comments}
            </Typography>
          </Grid>

          <Grid container xs={2} className={classes.reviewersContainer}>
            <Grid item className={classes.titleReviewers}>
              <Typography variant="subtitle2">
                Reviewers
              </Typography>
            </Grid>
            <Grid item className={classes.reviewersAvatarContainer}>
            {reviewers.map((item, index) => {
              return (
                <Avatar
                  alt=""
                  src={item.links.avatar.href}
                  className={classes.avatarReviewrs}
                />
              );
            })}
            </Grid>
          </Grid>

          <Grid container xs={2} className={classes.reviewersContainer}>
            <Grid item className={classes.titleReviewers}>
              <Typography variant="subtitle2">
                Approved
              </Typography>
            </Grid>
         
            <Grid item className={classes.reviewersAvatarContainer}>
            {participants.map((item => {
              if(item.approved===true){
                  return (
                
                <Badge badgeContent={"✔"} classes={{ badge: classes.badge }}>
                  <Avatar
                    alt=""
                    src={item.user.links.avatar.href }
                    className={classes.avatarReviewrs}
                  />
                </Badge>
                )
              }else{ 
                return(
                  ""
                )
              }
            
            }))}
            </Grid>
          </Grid>

          <Grid container xs={2} className={classes.dateContainer}>
            <Grid item>
              <Typography variant="subtitle2">
                <div className={classes.date}>
                  {moment(date).format("DD/MM/YYYY hh:mm:ss")}
                </div>
              </Typography>
            </Grid>
            <Grid item>
              <div> {this.getDiffDates(date)} </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

PullReqCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PullReqCard);
