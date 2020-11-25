import React from 'react';
import { connect } from 'react-redux';
import { startEditCourseRecommendation } from '../actions/courseRecommendations';
import { startAddRatingsByUserSelection } from '../actions/ratingsByUserSelection';
import { startAddUserTimeInModal } from '../actions/timeInModal';
import { startAddRegistrationToUser, startRemoveRegistrationFromUser } from '../actions/registrations';
import selectLOSelectionsForUser from '../selectors/learningobjective_userselect';
import { startRemoveLOSelectionFromUser } from '../actions/learningobjective_userselect';
import { startRemoveCourseRecommendation} from '../actions/courseRecommendations';
import Modal from './Modal';
import Avatar from '@material-ui/core/Avatar';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import selectSessions from '../selectors/sessions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { firebase } from '../firebase/firebase';
import moment from 'moment/moment';
import Paper from '@material-ui/core/Paper';
import ReactStars from "react-rating-stars-component";
import StarRatingComponent from "react-star-rating-component"; 
import { Work, BackspaceSharp, StarsSharp } from '@material-ui/icons';

class CourseRecommendationListItem extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        showModal: false,
        instructor: props.instructor,
        fee: props.fee,
        courserecommendationId: props.id,
        currentRating: props.rating,
        disposition: props.disposition,
        newDisposition: props.disposition,
        isPortFolio: props.disposition === `Portfolio` ? true : false,
        isRegistered: props.registrationId === 0 ? false : true,
        currentTitle: props.coursename,
        currentDescription: props.coursedescription,
        courseid: props.courseid,
        statusAvatarUrl: this.setStatusAvatarURL(props.registrationId === 0 ? 'Cart' : 'Registered'),
        newRating: props.rating,
        timeEnteredModal: Date.now(),
        registrationRequested: false,
        removeRequested: false,
        cancelButtonText: 'OK',
        learningobjectives: props.learningobjectives,
        userid: firebase.auth().currentUser.uid
      }
  }
  
  getLOSelectionPairing(loId) {
    const pairing = this.props.learningobjective_userselects.find(p => p.learningobjectiveid === loId) || {id:0};
    return pairing.id;
  }

  toggleModalWithRemove = () => {

    this.toggleModal();
    this.setState({
      removeRequested: true,
      cancelButtonText: 'Cancel'
    });

  }

  toggleModalWithConfirmRemove = () => {

    if(this.state.showModal == true)
    {

      var loData = {...this.state.learningobjectives};
      Object.keys(loData).map((key) => {
        const currentLO = loData[key]
        const loSelectionPairingId = this.getLOSelectionPairing(currentLO.learningobjectiveid)
        const loPairing = {id: loSelectionPairingId};
        console.log(`loSelectionPairing: ${loSelectionPairingId}`);
        this.props.startRemoveLOSelectionFromUser(loPairing);
      })

      const recommendationPairing = {id: this.props.id};
      this.props.startRemoveCourseRecommendation(recommendationPairing);
    }
  
    this.setState({
      showModal: !this.state.showModal,
      removeRequested: false,
      cancelButtonText: 'OK'
    });
    this.recordTimeInModal('remove recommendation', this.state.currentRating);
    
  }

  recordTimeInModal = (disposition, rating) => {
    let timeStamp = Date.now();

    let timeInModal = timeStamp - this.state.timeEnteredModal;

    const timeInModalCapture = {timeInModal: timeInModal, userid: this.props.userid, disposition: disposition, rating: rating, timeEnteredModal: this.state.timeEnteredModal, timeClosedModal: timeStamp};
    this.props.startAddUserTimeInModal(timeInModalCapture);
  }

  toggleModal = () => {
    let timeStamp = Date.now();
    if(this.state.showModal == false)
    {
      this.setState({
        timeEnteredModal: timeStamp
      })
    } else {
      this.setState({
        newRating: this.state.currentRating
      })
    }
    this.setState({
      showModal: !this.state.showModal
    });
  }

  toggleModalWithCancel = () => {

    this.setState({
      showModal: !this.state.showModal,
      newRating: this.state.currentRating,
      isPortFolio: false,
      removeRequested: false,
      registrationRequested: false,
      cancelButtonText: 'OK'
    });
    this.recordTimeInModal('cancel', this.state.currentRating);
  }

  handleRatingChange = event => {
    this.setState({newRating: event.target.value});
  }

  handleStarRatingChange = (newRating) => {
    this.setState({newRating: newRating});
  };

  recordLocalStarRating = (newRating) => {
    this.setState({newRating: newRating});

    if(newRating != this.state.currentRating)
      this.recordRating(this.props.id, newRating, this.props.courseid, this.props.userid);

    this.setState({currentRating: newRating});
  }


  recordLocalRating = (rating,e) => {
    this.setState({newRating: rating});

    if(rating != this.state.currentRating)
      this.recordRating(this.props.id, rating, this.props.courseid, this.props.userid);

    this.setState({currentRating: rating});
  }

  recordDisposition = (id,newDisposition,courseid,userid) => {
    this.setState({disposition: newDisposition});
    const dispositionData = {disposition: newDisposition};
    this.props.startEditCourseRecommendation(id, dispositionData);
  }

  recordRating = (id,rating,courseid,userid) => {

    console.log(`inside recordRating with ${rating}`)

    this.setState({currentRating: rating});
    const ratingData = {rating: rating};
    this.props.startEditCourseRecommendation(id, ratingData);

    const ratingCapture = {courseid: courseid, userid: userid, rating: rating};
    this.props.startAddRatingsByUserSelection(ratingCapture);
  }

  toggleModalWithRegister = () => {

    this.toggleModal();
    this.setState({
      registrationRequested: true,
      cancelButtonText: 'Cancel'
    });

  }

  toggleModalWithConfirmRegister = () => {

    if(this.state.showModal == true)
    {

      const registrationData = {courseid: this.state.courseid, 
        course_name: this.state.currentTitle, 
        course_description: this.props.coursedescription,
        rating: 0,
        course_instructor: this.state.instructor, 
        course_fee: this.state.fee, 
        userid: this.state.userid, 
        user_email: firebase.auth().currentUser.email, 
        registration_status: 'approved'};

      this.props.startAddRegistrationToUser(registrationData);

      this.setState({
        newDisposition: `Registered`,
        isRegistered: true
      });

      this.recordDisposition(this.props.id, "Registered", this.props.courseid, this.props.userid);

    }

    this.setState({
      showModal: !this.state.showModal,
      statusAvatarUrl: this.setStatusAvatarURL('Registered'),
      registrationRequested: false,
      cancelButtonText: 'OK'
    });
    this.recordTimeInModal('register', this.state.currentRating);
  }

  setStatusAvatarURL = (status) => {
    {
      switch(status) {
        case `Cart`:
          return `/images/shopping-cart.png`;
        case `Registered`:
          return `/images/briefcase.jpg`
        default:
          return `/images/shopping-cart.png`;
      }
    }
  }

  render() {

    var reasonData = {...this.props.learningobjectives};
    const result = Object.keys(reasonData).map((key) => reasonData[key]);

    var reasons = [];
    result.forEach((reason) => (
      reasons.push(<li key={reason.learningobjectiveid}>
        <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>
          {reason.content}
        </Typography>
        </li>)
    ));

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

    const myRatingLabel = () => {
      if (parseInt(this.state.currentRating) < 1)
        return "Rate Me"
  
      return "My Rating"
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
                <Paper><Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>{this.state.currentDescription}</Typography></Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>
                    Based on your selection of:
                </Typography>
                <ul>{reasons}</ul>
                </Paper>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Paper><Typography type="body2" style={{ fontSize: '1.00em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>Instructor: {this.state.instructor}   -  Fee: {'$' + this.state.fee.toFixed(2)}</Typography></Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                    <Typography type="body2" style={{ fontSize: '1.00em', fontWeight: `semi-bold`, color: `#000000`, textAlign: `left` }}>
                        Sessions:
                    </Typography>
                    <ul>{sessionItems}</ul>
                    </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Grid container direction="row" justify="center" alignItems="center" alignContent="center" >
                        <Grid item>
                          <Button
                            color="primary"
                            aria-label="Rating"
                            style={{fontWeight: "bold"}}
                            title="Rating"
                            startIcon={<StarsSharp />}
                            onClick={this.toggleModal}><Typography style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000` }}>{myRatingLabel()}</Typography>
                          </Button>
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

                      <Grid container direction="row" justify="center" alignItems="center" alignContent="center" >
                        <Grid item>
                          <Button
                            hidden={this.state.isRegistered}
                            disabled={parseInt(this.state.currentRating) < 1}
                            color="primary"
                            aria-label="Register"
                            style={{fontWeight: "bold"}}
                            title="Register"
                            startIcon={<Work />}
                            onClick={this.toggleModalWithRegister}><Typography style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000` }}>Register</Typography>
                          </Button>
                        </Grid>
                      </Grid>
                      <br/>
                      <Grid container direction="row" justify="center" alignItems="center" alignContent="center" >
                        <Grid item>
                          <Button
                            hidden={this.state.isRegistered}
                            disabled={parseInt(this.state.currentRating) < 1}
                            aria-label="Remove"
                            style={{fontWeight: "bold"}}
                            title="Register"
                            startIcon={<BackspaceSharp />}
                            onClick={this.toggleModalWithRemove}><Typography style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000` }}>Remove</Typography>
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
                            <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }}>Please Rate this Recommendation based on Your Level of Agreement with the Following Statement: <br/><br/> This course fits With a desired Learning Outcome, and is the type of course I was hoping to find.</Typography>
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
                          hidden={this.state.registrationRequested == false}
                          color="primary"
                          aria-label="Register"
                          style={{fontWeight: "bold"}}
                          title="Register"
                          onClick={this.toggleModalWithConfirmRegister}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Confirm Register</Typography>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          hidden={this.state.removeRequested == false}
                          disabled={this.state.currentRating < 1}
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
  learningobjective_userselects: selectLOSelectionsForUser(state.learningobjective_userselects, state.filters),
  sessions: selectSessions(state.sessions, props.courseid),
  filters: state.filters
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditCourseRecommendation: (id, ratingData) => dispatch(startEditCourseRecommendation(id, ratingData)),
  startAddRegistrationToUser: (registrationData) => dispatch(startAddRegistrationToUser(registrationData)),
  startRemoveRegistrationFromUser: (id) => dispatch(startRemoveRegistrationFromUser(id)),
  startAddRatingsByUserSelection: (ratingCapture) => dispatch(startAddRatingsByUserSelection(ratingCapture)),
  startRemoveLOSelectionFromUser: (loPairing) => dispatch(startRemoveLOSelectionFromUser(loPairing)),
  startRemoveCourseRecommendation: (recommendationId) => dispatch(startRemoveCourseRecommendation(recommendationId)),
  startAddUserTimeInModal: (timeInModalCapture) => dispatch(startAddUserTimeInModal(timeInModalCapture))
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseRecommendationListItem);