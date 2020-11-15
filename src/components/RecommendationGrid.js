import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';

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
    width: theme.spacing(7),
    height: theme.spacing(7),
  },  
}));

export default function RecommendationGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper className={classes.paper}><Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>{props.course_description}</Typography></Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}><Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>Instructor: {props.instructor}   -  Fee: {props.fee}</Typography></Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>
                    Based on your selection of:
                </Typography>
                <ul>{props.reasons}</ul>
                </Paper>
            </Grid>
            <Grid item xs={7}>
                <Paper className={classes.paper}>
                <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>
                    Sessions:
                </Typography>
                <ul>{props.sessions}</ul>
                </Paper>
            </Grid>
            <Grid item xs={5}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper className={classes.avatar_paper}>
                          {<b>My Rating</b>}<Avatar alt="My Rating" src={props.avatarSrc} className={classes.medium}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>  
    </div>
  );
}
