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
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import selectCourseRecommendations from '../selectors/courserecommendations';
import selectSessions from '../selectors/sessions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { firebase } from '../firebase/firebase';
import moment from 'moment/moment';
import { Work, SaveSharp, BackspaceSharp } from '@material-ui/icons';

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
        courseid: props.courseid,
        currentAvatarUrl: this.setAvatarURL(props.rating),
        statusAvatarUrl: this.setStatusAvatarURL(props.registrationId === 0 ? 'Cart' : 'Registered'),
        newRating: props.rating,
        timeEnteredModal: Date.now(),
        userid: firebase.auth().currentUser.uid
      }
  }
  
  getLOSelectionPairing(loId) {
    const pairing = this.props.learningobjective_userselects.find(p => p.learningobjectiveid === loId) || {id:0};
    return pairing.id;
  }


  toggleModalWithRemove = () => {

    if(this.state.showModal == true)
    {

      var loData = {...this.props.courserecommendation.learningobjectives};
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
      showModal: !this.state.showModal
    });
    this.recordTimeInModal('remove recommendation', this.state.currentRating);
    
  }

  toggleModalWithSave = () => {

    if(this.state.newRating != this.state.currentRating)
      this.recordRating(this.props.id, this.state.newRating, this.props.courseid, this.props.userid);

    if(this.state.disposition != this.state.newDisposition)
      this.recordDisposition(this.props.id, this.state.newDisposition, this.props.courseid, this.props.userid);

    // may want to put this back in but for now, do not close modal on save rating only
    // this.setState({
    //   showModal: !this.state.showModal
    // });

    this.recordTimeInModal('save', this.state.currentRating);
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
      isPortFolio: false
    });
    this.recordTimeInModal('cancel', this.state.currentRating);
  }

  handleRatingChange = event => {
    this.setState({newRating: event.target.value});
  }

  recordLocalRating = (rating,e) => {
    this.setState({newRating: rating});
  }

  recordDisposition = (id,newDisposition,courseid,userid) => {
    this.setState({disposition: newDisposition});
    const dispositionData = {disposition: newDisposition};
    this.props.startEditCourseRecommendation(id, dispositionData);
  }

  // recordRating = (id,rating,courseid,userid,learningobjectives) => {
  //   this.setState({currentRating: rating});
  //   const ratingData = {rating: rating};
  //   this.props.startEditCourseRecommendation(id, ratingData);
  //   this.setState({currentAvatarUrl: this.setAvatarURL(rating)});

  //   var loData = {...learningobjectives};

  //   Object.keys(loData).map((key) => {
  //     var currentLO = loData[key];
  //     const ratingCapture = {courseid: courseid, learningobjectiveid: currentLO.learningobjectiveid, userid: userid, rating: rating};
  //     this.props.startAddRatingsByUserCourseLO(ratingCapture);
  //   })
  // }

  recordRating = (id,rating,courseid,userid) => {
    this.setState({currentRating: rating});
    const ratingData = {rating: rating};
    this.props.startEditCourseRecommendation(id, ratingData);
    this.setState({currentAvatarUrl: this.setAvatarURL(rating)});

    const ratingCapture = {courseid: courseid, userid: userid, rating: rating};
    this.props.startAddRatingsByUserSelection(ratingCapture);
  }

  toggleModalWithRegister = () => {

    if(this.state.showModal == true)
    {

      const registrationData = {courseid: this.state.courseid, 
        course_name: this.state.currentTitle, 
        course_description: this.props.coursedescription,
        rating: this.state.newRating,
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

      // if(this.state.newRating != this.state.currentRating)
      //   this.recordRating(this.props.id, this.state.newRating, this.props.courseid, this.props.userid, this.props.learningobjectives);

      this.recordDisposition(this.props.id, "Registered", this.props.courseid, this.props.userid);

    }

    this.setState({
      showModal: !this.state.showModal,
      statusAvatarUrl: this.setStatusAvatarURL('Registered')

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

    var reasonData = {...this.props.learningobjectives};
    const result = Object.keys(reasonData).map((key) => reasonData[key]);

    var reasons = [];
    result.forEach((reason) => (
      reasons.push(<li key={reason.learningobjectiveid}>{reason.content}</li>)
    ));

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
            <CardHeader avatar={<Avatar src={this.state.statusAvatarUrl} className={"avatar"}/>} titleTypographyProps={{variant:'h4'}} title={this.state.currentTitle} />
            <CardContent>
              <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                {this.props.coursedescription}
              </Typography>
              <br/>
              <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                {this.state.instructor}   |  {'$' + this.state.fee.toFixed(2)}
              </Typography>
              <Divider/>
              <Avatar src={this.state.currentAvatarUrl} className={"avatar"}/>               
              <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                Based on your selection of:
                <ul>
                  {reasons}
                </ul>
              </Typography>
              <br/>
              <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                Sessions:
                <ul>
                  {sessionItems}
                </ul>
              </Typography>
              <br/>
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
                  <h4 className="page-header__title">{this.props.coursename}</h4>
              </div>
              </div>
              <div className="content-container">
                <span>
                <Typography style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }} gutterBottom>
                  {this.props.coursedescription}
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
                              disabled={this.state.currentRating == this.state.newRating}
                              color="inherit"
                              aria-label="Accept"
                              style={{fontWeight: "bold"}}
                              title="Accept"
                              startIcon={<SaveSharp />}
                              onClick={this.toggleModalWithSave}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Save Rating</Typography></Button>
                          </Grid>
                          <Grid item>
                            <Button
                              hidden={this.state.isRegistered}
                              disabled={this.state.currentRating == "-1"}
                              color="primary"
                              aria-label="Register"
                              style={{fontWeight: "bold"}}
                              title="Register"
                              startIcon={<Work />}
                              onClick={this.toggleModalWithRegister}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Move To Courses</Typography>
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              hidden={this.state.isRegistered}
                              disabled={this.state.currentRating == "-1"}
                              color="primary"
                              aria-label="Remove"
                              style={{fontWeight: "bold"}}
                              title="Register"
                              startIcon={<BackspaceSharp />}
                              onClick={this.toggleModalWithRemove}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Remove</Typography>
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
  courserecommendations: selectCourseRecommendations(state.courserecommendations, state.filters),
  courserecommendation: state.courserecommendations.find((courserecommendation) => courserecommendation.id === props.id),
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