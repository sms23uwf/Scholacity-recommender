import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import { List, ListItem, ListItemText, ListItemAvatar, ListItemIcon } from '@material-ui/core';

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

export default function CourseGrid(props) {
  const classes = useStyles();

  const myRatingLabel = () => {
    if (props.rating == `-1`)
      return ""

    return "My Rating"
  };

  return (
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
                  <Grid item xs={12}>
                    <Grid container direction="row" justify="center" alignItems="center" alignContent="center" >
                        <Grid item>
                          <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>{myRatingLabel()}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center" alignContent="center" >
                        <Grid item>
                          <img src={props.avatarSrc} width="42px" height="42px"/>
                        </Grid>
                    </Grid>
                  </Grid>
              </Grid>
            </Grid>
        </Grid>  
    </div>
  );
}
