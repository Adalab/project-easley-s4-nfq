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
  },
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
  },
  branches: {
    width: "100px",
    display: "flex",
    flexDirection: "column",
    margin: "0 30px",
  },
  fromBranch :{
    overflow: "hidden",
    whiteSpace:"nowrap",
    textOverflow: "ellipsis"
  },
  toBranch :{
    overflow: "hidden",
    whiteSpace:"nowrap",
    textOverflow: "ellipsis"
  },
  comments: {
    width: "35px",
    margin: "0 20px"
  },
  titleReviewers:{
    fontWeight: "bold",
  },
  reviewersContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "0 20px"
  },
  reviewersAvatarContainer:{
    display: "flex",
    flexDirection: "row",
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
    paddingBottom:"10px",
    fontWeight: "bold",
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
              alt="Author's image"
              src={authorAvatar}
              className={classes.authorAvatar}
            />
          </Grid>

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

          <Grid item xs={2} className={classes.branches}>
            <Typography variant="subtitle2" className={classes.fromBranch} color="secondary">{fromBranch}</Typography>
              <i className="fas fa-arrow-down"/>
            <Typography variant="subtitle2" className={classes.toBranch} color="secondary">{toBranch}</Typography>
          </Grid>

          <Grid item xs={1} className={classes.comments}>
            <Typography variant="subtitle2" color="secondary">
              <i className="far fa-comment-dots fa-2x"/><br/>{comments}
            </Typography>
          </Grid>

          <Grid container xs={2} className={classes.reviewersContainer}>
            <Grid item>
              <Typography className={classes.titleReviewers} variant="subtitle2" color="secondary">
                Reviewers
              </Typography>
            </Grid>
            <Grid item className={classes.reviewersAvatarContainer}>
            {reviewers.map((item, index) => {
              return (
                <Avatar
                  key={index}
                  alt="Reviewer's image"
                  src={item.links.avatar.href}
                  className={classes.avatarReviewrs}
                />
              );
            })}
            </Grid>
          </Grid>

          <Grid container xs={2} className={classes.reviewersContainer}>
            <Grid item>
              <Typography className={classes.titleReviewers} variant="subtitle2" color="secondary">
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
              <Typography variant="subtitle2" color="secondary">
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
