import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Reviewers from './Reviewers';
import Date from './Date';
import Branches from './Branches';
import AuthorAvatar from './AuthorAvatar';
import Comments from './Comments'
import Participants from "./Participants";
import InformationPr from "./InformationPr";

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
  }
});

class PullReqCard extends Component {

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
      <Card className={classes.card} >
        <CardContent className={classes.cardContent}>

          <AuthorAvatar authorAvatar={authorAvatar}/>
          <InformationPr authorName={authorName} title={title} id={id}/>
          <Branches fromBranch={fromBranch} toBranch={toBranch}/>
          <Comments comments={comments}/>
          <Reviewers reviewers={reviewers}/>
          <Participants participants={participants}/>
          <Date date={date}/>

        </CardContent>
      </Card>
    );
  }
}

PullReqCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PullReqCard);
