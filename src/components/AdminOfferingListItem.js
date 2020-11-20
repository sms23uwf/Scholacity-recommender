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
import ReactStars from "react-rating-stars-component";
//import { FaStar } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  showAverageOfferingRating = () => {
    
    if (this.state.avgOfferingExpectationRating < 1)
      return null;

      const selectionRatingSchema = {
        size: 32,
        count: 5,
        edit: false,
        color: "#CDCDCD",
        activeColor: "black",
        value: this.state.avgOfferingExpectationRating,
        ally: true,
        isHalf: false,  
        emptyIcon: <i className="far fa-star"></i>,
        fullIcon: <i className="fa fa-star"></i>
      };
    
    return (
      <div>
        <br/>
        <Divider/>
        <br/>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container direction="row" justify="center" alignItems="center" alignContent="center" >
              <Grid item>
                <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }}>Average User Agreement to this Statement: "This course fits With a desired Learning Outcome, and is the type of course I was hoping to find."</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center" alignContent="center" >
              <Grid item>
                <ReactStars {...selectionRatingSchema} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }

  showAverageSatisfactionRating = () => {
    
    if (this.state.avgCourseSatisfactionRating < 1)
      return null;

      const courseRatingSchema = {
        size: 32,
        count: 5,
        edit: false,
        color: "#CDCDCD",
        activeColor: "black",
        value: this.state.avgCourseSatisfactionRating,
        ally: true,
        isHalf: false,  
        emptyIcon: <i className="far fa-star"></i>,
        fullIcon: <i className="fa fa-star"></i>
      };
    
    return (
      <div>
        <br/>
        <Divider/>
        <br/>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container direction="row" justify="center" alignItems="center" alignContent="center" padding="2em">
              <Grid item>
                <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }}>Average Rating based on the following statement: "Having taken this course, I found that it satisfied my learning goals and expectations."</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center" alignContent="center" >
              <Grid item>
                <ReactStars {...courseRatingSchema} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }

  showAverageCourseRatings = () => {
    if (this.state.avgOfferingExpectationRating < 1 && this.state.avgCourseSatisfactionRating < 1)
      return null;

    return (
      <List>
        {this.showAverageOfferingRating()}  
        {this.showAverageSatisfactionRating()}
      </List>

    )    
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
            <Typography type="body2" style={{ fontSize: '1.00em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
            {session.session_number}
            </Typography>
          </Grid>
          <Grid item>
            <Typography type="body2" style={{ fontSize: '1.00em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
            {session.DOW.substring(0,3).toUpperCase()}
            </Typography>
          </Grid>
          <Grid item>
            <Typography type="body2" style={{ fontSize: '1.00em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
            {moment(session.session_date).format('DD MMM YYYY')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography type="body2" style={{ fontSize: '1.00em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
            {moment(session.session_time_start).format('hh:mm A')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography type="body2" style={{ fontSize: '1.00em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
            {moment(session.session_time_end).format('hh:mm A')}
            </Typography>
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
              {this.showAverageCourseRatings()}
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