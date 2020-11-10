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
import moment from 'moment/moment'
import { firebase } from '../firebase/firebase';
import { SaveSharp, BackspaceSharp } from '@material-ui/icons';


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
        currentAvatarUrl: this.setAvatarURL(props.rating),
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
  }

  // recordRating = (id,rating,courseid,userid) => {
  //   this.setState({currentRating: rating});
  //   const ratingData = {rating: rating};
  //   this.props.startEditCourseRegistration(id, ratingData);
  //   this.setState({currentAvatarUrl: this.setAvatarURL(rating)});

  //   const ratingCapture = {courseid: courseid, userid: userid, rating: rating};
  //   this.props.startAddRatingsByUserCourse(ratingCapture);
  // }

  recordRating = (id,rating,courseid,userid) => {
    this.setState({currentRating: rating});
    const ratingData = {rating: rating};
    this.props.startEditCourseRegistration(id, ratingData);
    this.setState({currentAvatarUrl: this.setAvatarURL(rating)});

    const ratingCapture = {courseid: courseid, userid: userid, rating: rating};
    this.props.startAddRatingsByUserSelection(ratingCapture);
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
          return `/images/rate_me_icon.png`;
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
            <CardHeader avatar={<Avatar src={this.state.statusAvatarUrl} className={"avatar"}/>} titleTypographyProps={{variant:'h4'}} title={this.state.currentTitle}/>
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
              <Avatar src={this.state.currentAvatarUrl} className={"avatar"}/>               
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

              <div>
              <form action="">
              <label className="statement">This course fits With a desired Learning Outcome, and is the type of course I was hoping to find.</label>
              <ul className='likert'>
                <li>
                  <input type="radio" name="likert" value="0" checked={this.state.newRating === "0"} onChange={(e) => this.recordLocalRating("0",e)}/>
                  <label>Strongly Disagree</label>
                </li>
                <li>
                  <input type="radio" name="likert" value="1" checked={this.state.newRating === "1"} onChange={(e) => this.recordLocalRating("1",e)}/>
                  <label>Disagree</label>
                </li>
                <li>
                  <input type="radio" name="likert" value="2" checked={this.state.newRating === "2"} onChange={(e) => this.recordLocalRating("2",e)}/>
                  <label>Neutral</label>
                </li>
                <li>
                  <input type="radio" name="likert" value="3" checked={this.state.newRating === "3"} onChange={(e) => this.recordLocalRating("3",e)}/>
                  <label>Agree</label>
                </li>
                <li>
                  <input type="radio" name="likert" value="4" checked={this.state.newRating === "4"} onChange={(e) => this.recordLocalRating("4",e)}/>
                  <label>Strongly Agree</label>
                </li>
              </ul>
              </form>

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
                              aria-label="Save"
                              style={{fontWeight: "bold"}}
                              title="Save"
                              startIcon={<SaveSharp />}
                              onClick={this.toggleModalWithSave}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Save Rating</Typography></Button>
                          </Grid>

                          <Grid item>
                            <Button
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
                <div>
                  <Button title="Close" className="close_modal" onClick={this.toggleModalWithCancel}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>X</Typography></Button>
                </div>
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