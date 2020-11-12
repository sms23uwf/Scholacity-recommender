import React from 'react';
import { connect } from 'react-redux';
import { startAddCourseSelection, startEditCourseSelection } from '../actions/courseSelections';
import { startAddUserTimeInModal } from '../actions/timeInModal';
import { startAddRegistrationToUser, setRegistrationsByUser } from '../actions/registrations';
import Avatar from '@material-ui/core/Avatar';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import selectCourseSelections from '../selectors/courseselections';
import selectSessions from '../selectors/sessions';
import Grid from '@material-ui/core/Grid';
import { firebase } from '../firebase/firebase';
import moment from 'moment/moment'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

class AdminOfferingListItem extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        showModal: false,
        instructor: props.instructor,
        fee: props.fee,
        disposition: 'Open',
        courseid: props.id,
        knowledeAreaId: props.knowledgeareaid,
        currentTitle: props.name,
        avgOfferingExpectationRating: props.avgOfferingRating,
        avgCourseSatisfactionRating: props.avgCourseRating,
        currentDescription: props.description,
        currentAvatarUrl: this.setStatusAvatarURL('Open'),
        timeEnteredModal: Date.now(),
        userid: firebase.auth().currentUser.uid
      }
  }
  
  setStatusAvatarURL = (status) => {
    {
      switch(status) {
        case 'Open':
          return '/images/local_library.png';
        default:
          return '/images/local_library.png';
      }
    }
  }

  setAvatarURL = (rating) => {

    {
      switch(rating) {
        case '0':
          return '/images/verysad.png';
        case `1`:
            return `/images/sad.png`;
        case `2`:
            return `/images/justso.png`;
        case `3`:
             return `/images/happy.png`;
        case `4`:
          return `/images/veryhappy.png`;
        default:
            return ``;
      }
    }
  }

  render() {

    const sessionItems = this.props.sessions.map((session) =>
      <li key={session.session_number}>
        <Grid
          justify="flex-start" 
          container 
          spacing={1}
        >
          <Grid item>
            {session.session_number}
          </Grid>
          <Grid item>
            {session.DOW.padEnd(9)}
          </Grid>
          <Grid item>
            {moment(session.session_date).format('DD MMM YYYY')}
          </Grid>
          <Grid item>
            {moment(session.session_time_start).format('hh:mm A')}
          </Grid>
          <Grid item>
            {moment(session.session_time_end).format('hh:mm A')}
          </Grid>
        </Grid>
      </li>
    );
    return (
      <div>
      <Divider/>
        <CardActionArea onClick={this.toggleModal}>
          <Card>
            <CardHeader avatar={<Avatar src={this.state.currentAvatarUrl} className={"avatar"}/>} titleTypographyProps={{variant:'h4'}} title={this.state.currentTitle}/>
            <CardContent>
              <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                {this.state.currentDescription}
              </Typography>
              <br/>
              <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                {this.state.instructor}   |  {'$' + this.state.fee.toFixed(2)}
              </Typography>
              <br/>
              <Divider/>
              <List>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={this.setAvatarURL(this.state.avgOfferingExpectationRating)}/>
                  </ListItemAvatar>
                  <ListItemText primary={
                    <React.Fragment>
                    <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }}>
                    Average User Agreement to this Statement: "This course fits With a desired Learning Outcome, and is the type of course I was hoping to find."
                    </Typography>
                    </React.Fragment>
                    } />
                </ListItem>
                <Divider/>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={this.setAvatarURL(this.state.avgCourseSatisfactionRating)}/>
                  </ListItemAvatar>
                  <ListItemText primary={
                    <React.Fragment>
                    <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }}>
                    Average User Agreement to this Statement: "Having taken this course, I found that it satisfied my learning goals and expectations."
                    </Typography>
                    </React.Fragment>
                    } />
                </ListItem>
              </List>
              <Divider/>
              <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                Sessions:
                <ul>
                  {sessionItems}
                </ul>
              </Typography>
              <br/>
              <Divider/>
            </CardContent>
          </Card>
        </CardActionArea>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  courseselections: selectCourseSelections(state.courseselections, state.filters),
  courseselection: state.courseselections.find((courseselection) => courseselection.id === props.id),
  sessions: selectSessions(state.sessions, props.id),
  filters: state.filters
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditCourseSelection: (id, ratingData) => dispatch(startEditCourseSelection(id, ratingData)),
  startAddCourseSelection: (userCourse) => dispatch(startAddCourseSelection(userCourse)),
  startAddRegistrationToUser: (registrationData) => dispatch(startAddRegistrationToUser(registrationData)),
  setRegistrationsByUser: () => dispatch(setRegistrationsByUser()),
  startAddRatingsByUserCourseLO: (ratingCapture) => dispatch(startAddRatingsByUserCourseLO(ratingCapture)),
  startAddUserTimeInModal: (timeInModalCapture) => dispatch(startAddUserTimeInModal(timeInModalCapture))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOfferingListItem);