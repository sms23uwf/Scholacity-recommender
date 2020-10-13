import React from 'react';
import { connect } from 'react-redux';
import { startSetCourseSelections, startEditCourseSelection } from '../actions/courseSelections';
import { startAddUserTimeInModal } from '../actions/timeInModal';
import { startAddRegistrationToUser } from '../actions/registrations';
import Modal from './Modal';
import Avatar from '@material-ui/core/Avatar';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import selectCourseSelections from '../selectors/courseselections';
import selectSessions from '../selectors/sessions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Checkbox, FormControlLabel }  from '@material-ui/core';
import { firebase } from '../firebase/firebase';
import moment from 'moment/moment'
import { Work, Assessment, ShoppingCart, LocalLibrarySharp, CloseSharp } from '@material-ui/icons';

const checkBoxStyles = theme => ({
  root: {
    '&$checked': {
      color: '#3D70B2',
    },
  },
  checked: {},
 })

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

class CourseListItem extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        showModal: false,
        instructor: props.instructor,
        fee: props.fee,
        disposition: props.registrationId === 0 ? 'Open' : 'Registered',
        newDisposition: props.registrationId === 0 ? 'Open' : 'Registered',
        isRegistered: props.registrationId === 0 ? false : true,
        courseid: props.id,
        currentTitle: props.name,
        currentDescription: props.description,
        currentAvatarUrl: this.setAvatarURL(props.registrationId === 0 ? 'Open' : 'Registered'),
        timeEnteredModal: Date.now(),
        userid: firebase.auth().currentUser.uid
      }
  }
  
  toggleModalWithSave = () => {

    if(this.state.showModal == true)
    {
      this.props.startSetCourseSelections();
    }

    this.setState({
      showModal: !this.state.showModal
    });
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
      showModal: !this.state.showModal
    });
    this.recordTimeInModal('cancel', this.state.currentRating);
  }

  toggleModalWithRegister = () => {

    if(this.state.showModal == true)
    {
      const registrationData = {courseid: this.state.courseid, 
        course_name: this.state.currentTitle, 
        course_instructor: this.state.instructor, 
        course_fee: this.state.fee, 
        userid: this.state.userid, 
        user_email: firebase.auth().currentUser.email, 
        registration_status: 'requested'};

      this.props.startAddRegistrationToUser(registrationData);
    }

    this.setState({
      showModal: !this.state.showModal,
      disposition: 'Registered',
      currentAvatarUrl: this.setAvatarURL('Registered')
    });
    this.recordTimeInModal('register', this.state.currentRating);
  }

  setAvatarURL = (status) => {
    {
      switch(status) {
        case 'Open':
          return '/images/local_library.png';
        case `Interested`:
            return `/images/shopping_cart.webp`;
        case `Registered`:
            return `/images/briefcase.jpg`;
        default:
            return '/images/local_library.png';
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

        <Modal
          show={this.state.showModal}
          customClass="custom_modal_class"
        >
          <React.Fragment>
            <div>
              <div className="modal-header">
                <div className="content-container">
                  <h4 className="page-header__title">{this.props.name}</h4>
                </div>
              </div>
              <div className="content-container">
                <span>
                  <Typography style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }} gutterBottom>
                    {this.props.description}
                  </Typography>
                </span>
              </div>
            </div>
                <span>
                  <div>
                    <Grid
                    justify="center" 
                    container 
                    spacing={1}
                    >
                      <Grid item>
                      </Grid>

                        <Grid
                        justify="center" 
                        container 
                        spacing={2}
                        >
                          <Grid item>
                            <Button
                              color="primary"
                              aria-label="Save"
                              style={{fontWeight: "bold"}}
                              title="Save"
                              startIcon={<ShoppingCart />}
                              onClick={this.toggleModalWithSave}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Save To Cart</Typography>
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              disabled={this.state.isRegistered}
                              color="primary"
                              aria-label="Register"
                              style={{fontWeight: "bold"}}
                              title="Register"
                              startIcon={<Work />}
                              onClick={this.toggleModalWithRegister}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Register Now</Typography>
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              color="primary"
                              aria-label="Cancel"
                              style={{fontWeight: "bold"}}
                              title="Cancel"
                              startIcon={<CloseSharp />}
                              onClick={this.toggleModalWithCancel}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Exit</Typography></Button>
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
  courseselections: selectCourseSelections(state.courseselections, state.filters),
  courseselection: state.courseselections.find((courseselection) => courseselection.id === props.id),
  sessions: selectSessions(state.sessions, props.id),
  filters: state.filters
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditCourseSelection: (id, ratingData) => dispatch(startEditCourseSelection(id, ratingData)),
  startSetCourseSelections: () => dispatch(startSetCourseSelections()),
  startAddRegistrationToUser: (registrationData) => dispatch(startAddRegistrationToUser(registrationData)),
  startAddRatingsByUserCourseLO: (ratingCapture) => dispatch(startAddRatingsByUserCourseLO(ratingCapture)),
  startAddUserTimeInModal: (timeInModalCapture) => dispatch(startAddUserTimeInModal(timeInModalCapture))
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseListItem);