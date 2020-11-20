import React from 'react';
import { connect } from 'react-redux';
import { startEditCourseRegistration } from '../actions/registrations';
import { startAddUserTimeInModal } from '../actions/timeInModal';
import { startAddRatingsByUserCourse } from '../actions/ratingsByUserCourse';
import { startRemoveRegistrationFromUser } from '../actions/registrations';
import Modal from './Modal';
import Avatar from '@material-ui/core/Avatar';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import selectSessions from '../selectors/sessions';
import CourseGrid from './CourseGrid';
import moment from 'moment/moment'
import { firebase } from '../firebase/firebase';
import Paper from '@material-ui/core/Paper';
import ReactStars from "react-rating-stars-component";
//import { FaStar } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SaveSharp, BackspaceSharp, ClearSharp } from '@material-ui/icons';


class RegisteredCoursesListItem extends React.Component {
  constructor(props){
      super(props);

      this.state = {
        showModal: false,
        registrationId: props.id,
        disposition: props.disposition,
        newDisposition: props.disposition,
        currentRating: props.rating,
        newRating: props.rating,
        currentTitle: props.course_name,
        currentDescription: props.course_description,
        courseid: props.courseid,
        statusAvatarUrl: this.setStatusAvatarURL('Approved'),
        timeEnteredModal: Date.now(),
        instructor: props.course_instructor,
        fee: props.course_fee,
        userid: firebase.auth().currentUser.uid
      }
  }
  
  handleRatingChange = event => {
    this.setState({newRating: event.target.value});
  }

  recordLocalRating = (rating,e) => {
    this.setState({newRating: rating});

    if(rating != this.state.currentRating)
      this.recordRating(this.props.id, rating, this.props.courseid, this.props.userid);

    this.setState({currentRating: rating});
  }

  recordRating = (id,rating,courseid,userid) => {
    this.setState({currentRating: rating});
    const ratingData = {rating: rating};
    this.props.startEditCourseRegistration(id, ratingData);
    
    const ratingCapture = {courseid: courseid, userid: userid, rating: rating};
    this.props.startAddRatingsByUserCourse(ratingCapture);
  }

  toggleModalWithUnRegister = () => {

    if(this.state.showModal == true)
    {
      this.props.startRemoveRegistrationFromUser(this.state.registrationId);
    }
  
    this.setState({
      showModal: !this.state.showModal,
      statusAvatarUrl: this.setStatusAvatarURL('Cart'),
      isRegistered: false
    });
    this.recordTimeInModal('remove registration', this.state.currentRating);
  }

  toggleModalWithSave = () => {

    if(this.state.newRating != this.state.currentRating)
      this.recordRating(this.state.registrationId, this.state.newRating, this.props.courseid, this.state.userid);

    // this.setState({
    //   showModal: !this.state.showModal
    // });

    this.recordTimeInModal('save', this.state.currentRating);
  }



  recordTimeInModal = (disposition, rating) => {
    let timeStamp = Date.now();

    let timeInModal = timeStamp - this.state.timeEnteredModal;

    const timeInModalCapture = {timeInModal: timeInModal, userid: this.state.userid, disposition: disposition, rating: rating, timeEnteredModal: this.state.timeEnteredModal, timeClosedModal: timeStamp};
    this.props.startAddUserTimeInModal(timeInModalCapture);
  }

  toggleModal = () => {
    let timeStamp = Date.now();
    if(this.state.showModal == false)
    {
      this.setState({
        timeEnteredModal: timeStamp
      })
    } 
    this.setState({
      showModal: !this.state.showModal
    });
  }

  toggleModalWithCancel = () => {

    this.setState({
      showModal: !this.state.showModal,
    });
    this.recordTimeInModal('cancel', this.state.currentRating);
  }

  setStatusAvatarURL = (status) => {
    {
      switch(status) {
        case `Cart`:
          return `/images/shopping-cart.png`;
        case `Registered`:
          return `/images/briefcase.jpg`
        case 'Approved':
          return `/images/briefcase.jpg`
        default:
          return `/images/briefcase.jpg`;
      }
    }
  }

  render() {

    var ratingSchema = {
      size: 32,
      count: 5,
      color: "#CDCDCD",
      activeColor: "black",
      value: parseInt(this.state.currentRating),
      ally: true,
      isHalf: false,  
      emptyIcon: <i className="far fa-star"></i>,
      fullIcon: <i className="fa fa-star"></i>,   
      onChange: newValue => {
        this.recordLocalRating(newValue) 
      }
    };
  
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
            <CardHeader avatar={<Avatar src={this.state.statusAvatarUrl} className={"avatar"}/>} titleTypographyProps={{variant:'h4'}} title={this.state.currentTitle}/>
            <CardContent>
              <CourseGrid course_description = {this.state.currentDescription} sessions = {sessionItems} rating = {this.state.currentRating} avatarSrc = {this.state.currentAvatarUrl} instructor = {this.state.instructor} fee = {'$' + this.state.fee.toFixed(2)} />
            </CardContent>
          </Card>
        </CardActionArea>

        <Modal
          show={this.state.showModal}
          customClass="custom_modal_class"
        >
          <React.Fragment>
            <div>
              <div className="modal-header">
                <div className="content-container">
                  <h4 className="page-header__title">{this.state.currentTitle}</h4>
                </div>
              </div>
              <div className="content-container">
                <span>
                <Typography style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }} gutterBottom>
                  {this.state.currentDescription}
                </Typography>
                </span>
              </div>

              <Divider/>
              <br/>

              <div>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Grid container direction="row" justify="center" alignItems="center" alignContent="center" >
                        <Grid item>
                          <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }}>Please Rate Your Agreement with the Following Statement: <br/>Having taken this course, I found that it satisfied my learning goals and expectations.</Typography>
                        </Grid>
                      </Grid>
                      <Grid container direction="row" justify="center" alignItems="center" alignContent="center" >
                        <Grid item>
                          <ReactStars {...ratingSchema} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
            </div>
                <span>
                  <div>
                    <Grid
                    justify="center" 
                    container 
                    spacing={1}
                    >
                        <Grid
                        justify="center" 
                        container 
                        spacing={2}
                        >
                          <Grid item>
                            <Button
                              color="inherit"
                              aria-label="Cancel"
                              style={{fontWeight: "bold"}}
                              title="Cancel"
                              startIcon={<ClearSharp />}
                              onClick={this.toggleModalWithCancel}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Exit</Typography>
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              disabled={this.state.currentRating < 1}
                              color="primary"
                              aria-label="Remove"
                              style={{fontWeight: "bold"}}
                              title="Register"
                              startIcon={<BackspaceSharp />}
                              onClick={this.toggleModalWithUnRegister}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Remove Registration</Typography>
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                </span>
              </React.Fragment>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  sessions: selectSessions(state.sessions, props.courseid),
  filters: state.filters
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditCourseRegistration: (id, ratingData) => dispatch(startEditCourseRegistration(id, ratingData)),
  startAddRatingsByUserCourse: (ratingCapture) => dispatch(startAddRatingsByUserCourse(ratingCapture)),
  startRemoveRegistrationFromUser: (id) => dispatch(startRemoveRegistrationFromUser(id)),
  startAddUserTimeInModal: (timeInModalCapture) => dispatch(startAddUserTimeInModal(timeInModalCapture))
});

export default connect(mapStateToProps, mapDispatchToProps) (RegisteredCoursesListItem);