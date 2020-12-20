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
import CardHeader from "@material-ui/core/CardHeader";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import selectSessions from '../selectors/sessions';
import moment from 'moment/moment'
import { firebase } from '../firebase/firebase';
import ReactStars from "react-rating-stars-component";
import StarRatingComponent from "react-star-rating-component"; 
import { BackspaceSharp, StarsSharp } from '@material-ui/icons';
import HowToRegSharpIcon from '@material-ui/icons/HowToRegSharp';
import { Link } from 'react-router-dom';

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
        removeRequested: false,
        ratingRequested: false,
        registerRequested: false,
        cancelButtonText: 'OK',
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

  toggleModalWithRemove = () => {

    this.toggleModal();
    this.setState({
      removeRequested: true,
      registerRequested: false,
      ratingRequested: false,
      cancelButtonText: 'Cancel'
    });

  }

  toggleModalWithHowToReg = () => {
    this.toggleModal();
    this.setState({
      registerRequested: true,
      removeRequested: false,
      ratingRequested: false,
      cancelButtonText: 'OK'
    })
  }

  toggleModalWithRate = () => {
    this.toggleModal();
    this.setState({
      ratingRequested: true,
      removeRequested: false,
      registerRequested: false,
      cancelButtonText: 'OK'
    })
  }

  toggleModalWithConfirmRemove = () => {

    if(this.state.showModal == true)
    {
      this.props.startRemoveRegistrationFromUser(this.state.registrationId);
    }
  
    this.setState({
      showModal: !this.state.showModal,
      statusAvatarUrl: this.setStatusAvatarURL('Cart'),
      isRegistered: false,
      removeRequested: false,
      cancelButtontext: 'OK'
    });
    this.recordTimeInModal('remove registration', this.state.currentRating);
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
    else {
      this.setState({
        removeRequested: false,
        ratingRequested: false,
        registerRequested: false
      })
    }
    this.setState({
      showModal: !this.state.showModal
    });
  }

  toggleModalWithCancel = () => {

    this.setState({
      showModal: !this.state.showModal,
      removeRequested: false,
      cancelButtonText: 'OK'
    });
    this.recordTimeInModal('cancel', this.state.currentRating);
  }

  setStatusAvatarURL = (status) => {
    {
      switch(status) {
        case `Cart`:
          return `/images/noun_light_bulb.png`;
        case `Registered`:
          return `/images/shopping-cart.png`;
        case 'Approved':
          return `/images/shopping-cart.png`;
        default:
          return `/images/shopping-cart.png`;
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
      onChange: newValue => {
        this.recordLocalRating(newValue) 
      }
    };
  
    const sessionItems = this.props.sessions.map((session) =>
      <li key={session.session_number}>
        <Grid
          justify="flex-start" 
          flex-direction="column"
          container 
          spacing={1}
        >

          <Grid item>
            <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
            {session.session_number}
            </Typography>
          </Grid>

          <Grid item>
            <Typography type="body2" style={{ fontFamily: 'Lucida Console', fontSize: '1.25em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
            {session.DOW.padEnd(9,` `)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
              {moment(session.session_date).format('DD MMM YYYY')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
              {moment(session.session_time_start).format('hh:mm A')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
              {moment(session.session_time_end).format('hh:mm A')}
            </Typography>
          </Grid>
        </Grid>
      </li>
    );

    const ModalRating = () => {
      if (this.state.ratingRequested == true)
      {
        return (
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
        )
      }
      return null
    };
  
    const ModalHowToRegister = () => {
      if (this.state.registerRequested == true)
      {
        return (
          <div>
            <br/>
            <Divider/>
            <br/>
            <div className="content-container">
            <Typography type="body2" style={{ fontSize: '2.25em', fontWeight: `bold`, color: `#000000`, textAlign: `center` }}><Link to={{ pathname: "https://uwf.augusoft.net//index.cfm?method=ClassListing.ClassListingDisplay&int_category_id=12&int_sub_category_id=18&bit_url=1" }} target="_blank">Register online at uwf.edu/LeisureLearning</Link></Typography>
              <h1>850.473.7468</h1>
            </div>
          </div>
        )
      }
      return null
    };

    return (
      <div className="list-item">
      <Divider/>
      <Card>
        <CardHeader avatar={<Avatar src={this.state.statusAvatarUrl} className={"avatar"}/>} titleTypographyProps={{variant:'h4'}} title={this.state.currentTitle}/>
        <CardContent>
          <div>
          <Grid container spacing={1}>

            <Grid item xs={12}>
                <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>{this.state.currentDescription}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider/>
            </Grid>

            <Grid item xs={8}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>{this.state.instructor} - {'$' + this.state.fee.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Grid container direction="row" justify="center" alignItems="center" alignContent="center" >
                        <Grid item>
                          <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>My Rating</Typography>
                        </Grid>
                      </Grid>
                      <Grid container direction="row" justify="center" alignItems="center" alignContent="center" >
                        <Grid item>
                          <StarRatingComponent
                              name="courseRating"
                              starCount={5}
                              starColor="black"
                              emptyStarColor="#CDCDCD"
                              value={parseInt(this.state.currentRating)}
                              editing={false}
                            />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>
                            Sessions:
                        </Typography>
                        <ul>{sessionItems}</ul>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Divider/>
                </Grid>

                <Grid item xs={12}>
                  <Grid container direction="row" spacing={1} justify="center" alignItems="center" alignContent="center" >

                    <Grid item>
                      <Button
                        color="primary"
                        aria-label="HowToReg"
                        style={{fontWeight: "bold"}}
                        title="HowToReg"
                        startIcon={<HowToRegSharpIcon />}
                        onClick={this.toggleModalWithHowToReg}><Typography style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000` }}>How To Register</Typography>
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        hidden={parseInt(this.state.currentRating) > 0}
                        color="primary"
                        aria-label="Rating"
                        style={{fontWeight: "bold"}}
                        title="Rating"
                        startIcon={<StarsSharp />}
                        onClick={this.toggleModalWithRate}><Typography style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000` }}>Rate Me</Typography>
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        aria-label="Remove"
                        style={{fontWeight: "bold"}}
                        title="Register"
                        startIcon={<BackspaceSharp />}
                        onClick={this.toggleModalWithRemove}><Typography style={{ fontSize: '1.125em', fontWeight: `bold`, color: `#000000` }}>Remove</Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
        </div>
      </CardContent>
    </Card>


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
              <ModalHowToRegister/>
              <Divider/>
              <br/>
              <ModalRating/>
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
                              hidden={this.state.removeRequested == false}
                              color="primary"
                              aria-label="Remove"
                              style={{fontWeight: "bold"}}
                              title="Register"
                              onClick={this.toggleModalWithConfirmRemove}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Confirm Removal</Typography>
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              color="inherit"
                              aria-label="Cancel"
                              style={{fontWeight: "bold"}}
                              title="Cancel"
                              onClick={this.toggleModalWithCancel}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>{this.state.cancelButtonText}</Typography>
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