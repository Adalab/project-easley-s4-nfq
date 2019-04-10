import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Badge from '@material-ui/core/Badge';

const styles = theme => ({
  titleParticipants:{
    fontWeight: "bold",
  },
  participantsContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "0 20px"
  },
  participantsAvatarContainer:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  avatarParticipants: {
    margin: "5px",
  },
  badge: { 
    top: '30%', 
    right: -3, 
    backgroundColor: "green",
    color: "white"
  },
});

class Participants extends Component {
  render() {
    const { classes,participants } = this.props; 

      return (
        <Grid container xs={2} className={classes.participantsContainer}>
          <Grid item>
            <Typography className={classes.titleParticipant} variant="subtitle2" color="secondary">
              Approved
            </Typography>
          </Grid>
          <Grid item className={classes.participantsAvatarContainer}>
            {participants.map((item,img) => {
              if(item.approved===true){
                  return (
                    <Badge badgeContent={"✔"} classes={{ badge: classes.badge }}>
                      <Avatar
                        key={img}
                        alt=""
                        src={item.user.links.avatar.href }
                        className={classes.avatarParticipants}
                      />
                    </Badge>
                  )
              } else{ 
                  return(
                    ""
                  )
                }
            })}
          </Grid>   
        </Grid>
      );
    }
  }

Participants.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Participants);
