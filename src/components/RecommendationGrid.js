import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";

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
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
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
                <Paper className={classes.paper}>
                <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>
                    Based on your selection of:
                </Typography>
                <ul>{props.reasons}</ul>
                </Paper>
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
                        <Paper className={classes.avatar_paper}>{props.my_rating}</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}><Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>{props.instructor}   |  {props.fee}</Typography></Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>  
    </div>
  );
}
