import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import ReactDOM from 'react-dom';
import StarRatingComponent from "react-star-rating-component"; 
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Work, SaveSharp, BackspaceSharp, ClearSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  avatar_paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  medium: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },  
}));

export default function CourseSelectionGrid(props) {
  const classes = useStyles();

  const myRatingLabel = () => {
    if (props.rating < 1)
      return "Rate Me"

    return "My Rating"
  };

  return (

    <Card>
      <CardHeader avatar={<Avatar src={props.avatarSrc} className={"avatar"}/>} titleTypographyProps={{variant:'h4'}} title={props.course_title}/>
      <CardContent>
        <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
              <Paper className={classes.paper}><Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>{props.course_description}</Typography></Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}><Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>Instructor: {props.instructor}   -  Fee: {props.fee}</Typography></Paper>
          </Grid>
          <Grid item xs={8}>
              <Paper className={classes.paper}>
              <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>
                  Sessions:
              </Typography>
              <ul>{props.sessions}</ul>
              </Paper>
          </Grid>
          <Grid item xs={4}>
              <Grid container spacing={1}>
                <CardActionArea onClick={props.cardActionCallback}>
                  <Grid item xs={12}>
                    <Grid container direction="row" justify="center" alignItems="center" alignContent="center" >
                       <Grid item>
                         <Typography style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }}>{myRatingLabel()}</Typography>
                       </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center" alignContent="center" >
                      <Grid item>
                        <StarRatingComponent
                            name="courseRating"
                            starCount={5}
                            starColor="black"
                            emptyStarColor="#CDCDCD"
                            value={props.rating}
                            editing={false}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardActionArea>

                  <Grid item xs={12}>
                    <Grid container direction="row" justify="center" alignItems="center" alignContent="center" >
                      <Grid item>
                        <Button
                          hidden={props.isRegistered}
                          disabled={props.rating < 1}
                          color="primary"
                          aria-label="Register"
                          style={{fontWeight: "bold"}}
                          title="Register"
                          startIcon={<Work />}
                          onClick={props.registerCallback}><Typography style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000` }}>Register</Typography>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          hidden={props.isRegistered}
                          disabled={props.rating < 1}
                          color="primary"
                          aria-label="Remove"
                          style={{fontWeight: "bold"}}
                          title="Register"
                          startIcon={<BackspaceSharp />}
                          onClick={props.removeCallback}><Typography style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000` }}>Remove</Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
        </div>
      </CardContent>
    </Card>
  );
}

