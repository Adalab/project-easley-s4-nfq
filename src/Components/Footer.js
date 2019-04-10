import React, { Component } from "react";
import PropTypes from 'prop-types';
import AdalabLogo from "../images/logo-adalab-80px.png";
import nfqLogo from '../images/nfq-logo.png';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Link from '@material-ui/core/Link';

import {Typography} from '@material-ui/core';
// import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  card: {
    width: "100%",
    height:"50px",
    margin:"0px",
    padding:"0px",
    position: "absolute",
    bottom: "0px",
    backgroundColor: "#f5f5f5",
  },
  cardContent:{
    margin:"0px",
    padding:"0px"
  },
  footerPosition:{
    margin:"0px",
    padding:"0px",
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-around"
  },
  logoContainerNfq:{
    margin:"0px",
    width:"50px;"
  },
  logoNfq:{
    width:"90px",
    height:"50px"
  },
  cardContainerAdalabers: {
    width: "auto"
  },
  githubContainer:{
    display: "flex",
    flexDirection: "row",
    justifyContent:"center",
    alignItems:"center"
  },
  nameAdalaber: {
    textAlign: "center",
    marginTop: "10px",
    textTransform: "capitalize",
  },
  footerContainer:{
    position: "absolute",
    bottom: "0px",
    width: "100%",
  },
  logoContainerAdalab:{
    margin:"0px",
    padding:"0px",
    width: "100px",
    display:"flex",
    justifyContent: "flex-end",
    paddingRight: "20px"
  },
  logoAdalab:{
    width:"90px",
    height:"40px"
  }
 
});
class Footer extends Component {
  render() {
    const {classes} = this.props;
    
    return (
      <Card className={classes.card} >
        <CardContent className={classes.cardContent}>
          <div className={classes.footerPosition}>
            <Grid className={classes.logoContainerNfq} spacing={8}>
              <Grid item >
                  <Link
                    href="https://nfq.es"
                    target="_blank"
                    rel="noopener noreferrer">

                      <img
                      className={classes.logoNfq}
                      src={nfqLogo}
                      alt="logo ADALAB" />
                
                  </Link>
              </Grid>
            </Grid>

            <Grid container className={classes.cardContainerAdalabers}>
              <Grid item>
                  <Button TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                    <Link
                    href="https://github.com/claraharguindey"
                    target="_blank"
                    rel="noopener noreferrer" >
                    
                    <div className={classes.githubContainer}>
                      <i className="fab fa-github"/>
                      <span>
                        <Typography variant="body2" color="primary" className={classes.nameAdalaber}>
                            Clara Harguindey
                        </Typography>
                      </span>
                    </div>
                    </Link>
                  </Button>
              </Grid>


              <Grid item>
                  <Button TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                    <Link
                      href="https://github.com/inmasalcedo"
                      target="_blank"
                      rel="noopener noreferrer" >

                      <div className={classes.githubContainer}>
                        <i className="fab fa-github"  />
                        <span >
                          <Typography variant="body2" color="primary" className={classes.nameAdalaber}>
                            Inmaculada Salcedo
                          </Typography>
                        </span>
                      </div>
                    </Link>
                  </Button>
              </Grid>
    
              <Grid item>
                  <Button TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                    <Link
                      href="https://github.com/elisamartinb"
                      target="_blank"
                      rel="noopener noreferrer" >

                      <div className={classes.githubContainer}>
                        <i className="fab fa-github"  />
                        <span>
                          <Typography variant="body2" color="primary" className={classes.nameAdalaber}>
                            elisa martin
                          </Typography>
                        </span>
                      </div>
                    </Link>
                  </Button>
              </Grid>

              <Grid item>
                  <Button TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                    <Link
                      href="https://github.com/katia1802"
                      target="_blank"
                      rel="noopener noreferrer" >

                      <div className={classes.githubContainer}>
                        <i className="fab fa-github"  />
                        <span>
                          <Typography variant="body2" color="primary" className={classes.nameAdalaber}>
                            Katia Rojas
                          </Typography>
                        </span>
                      </div>
                    </Link>
                  </Button>
              </Grid>

              <Grid item>
                <Button TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                  <Link
                    href="https://github.com/babelarr"
                    target="_blank"
                    rel="noopener noreferrer" >

                    <div className={classes.githubContainer}>
                      <i className="fab fa-github"  />
                      <span>
                        <Typography variant="body2" color="primary" className={classes.nameAdalaber}>
                          Laura Sánchez
                        </Typography>
                      </span>
                    </div>
                  </Link>
                </Button>
              </Grid>
              
              <Grid item>
                <Button TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                  <Link
                    href="https://github.com/carolcesp"
                    target="_blank"
                    rel="noopener noreferrer" >

                    <div className={classes.githubContainer}>
                      <i className="fab fa-github"  />
                      <span>
                        <Typography variant="body2" color="primary" className={classes.nameAdalaber}>
                          Carolina céspedes
                        </Typography>
                      </span>
                    </div>
                  </Link>
                </Button>
              </Grid>

            </Grid>
            <Grid justify="rigth" alignItems="rigth" spacing={12} className={classes.logoContainerAdalab}>
              <Grid item>
                <Link
                  href="https://adalab.es"
                  target="_blank"
                  rel="noopener noreferrer">

                  <img
                  className={classes.logoAdalab}
                  src={AdalabLogo}
                  alt="logo ADALAB" />
                </Link>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles (styles)(Footer);

