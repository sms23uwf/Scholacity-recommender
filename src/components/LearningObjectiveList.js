import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import LearningObjectiveListItem from './LearningObjectiveListItem';
import selectLearningObjectives from '../selectors/learningobjectives';
import selectLOSelectionsForUser from '../selectors/learningobjective_userselect';
import selectLOCourses from '../selectors/learningobjective_course';
import selectCourses from '../selectors/courses';
import selectRegistrationsForUser from '../selectors/registration_user';
import { startAddUserTimeInModal } from '../actions/timeInModal';
import { startAddLOSelectionToUser, startRemoveLOSelectionFromUser } from '../actions/learningobjective_userselect';
import { startAddCourseRecommendation , startSetCourseRecommendations, startRemoveCourseRecommendation, startRemoveCourseSelectedLO} from '../actions/courseRecommendations';
import { startAddRecommendationLearningObjective , startRemoveRecommendationLearningObjective} from '../actions/recommendation_learningobjective';
import { firebase } from '../firebase/firebase';
import database from '../firebase/firebase';
import { setUUIDFilter, setLOFilter, setCourseFilter } from '../actions/filters';
import selectCourseRecommendations, {findExistingCourseRecommendation} from '../selectors/courserecommendations';
import { startAddUserSelectionEvent } from '../actions/selectionEvent';
import Modal from './Modal';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export class LearningObjectiveList extends React.Component {
  constructor(props) {
    super(props);
    props.setUUIDFilter(firebase.auth().currentUser.uid);
    this.state = {
      showModal: false,
      currentRating: '-1',
      timeEnteredModal: Date.now(),
      userid: firebase.auth().currentUser.uid
    }
  }

 
   recordSelectionEvent = (loId, eventDisposition) => {
    let timeStamp = Date.now();

    const selectionEventCapture = {timestamp: timeStamp, learningobjectiveid: loId, disposition: eventDisposition};
    this.props.startAddUserSelectionEvent(selectionEventCapture);
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
    this.recordTimeInModal('acknowledged', this.state.currentRating);
  }

  handleChange = (learningobjectiveid,learningobjective,pairingId,knowledgearea,isRegistered,e) => {

    this.setState(() => ({learningobjectiveid}));
    this.props.setLOFilter(learningobjectiveid);


    // if(isRegistered == true)
    // {
    //   console.log(`isRegistered: ${isRegistered}`)
    //   this.toggleModal();
    //   //return;
    // }

    if(e.target.checked===true)
    {

      if(isRegistered == true)
      {
        console.log(`isRegistered: ${isRegistered}`)
        this.toggleModal();
        //return;
      }
  
      const userid = firebase.auth().currentUser.uid;
      const loData = {learningobjectiveid: learningobjectiveid, userid: userid};

      this.recordSelectionEvent(learningobjectiveid, 'checked');

      this.props.startAddLOSelectionToUser(loData);

      var coursesFound = [];

      this.props.learningobjective_courses.map((learningobjective_course) => {
                
        if(loData.learningobjectiveid === learningobjective_course.learningobjectiveid)
        {
          this.props.courses.map((course) => {
            if(course.id === learningobjective_course.courseid)
            {
              if(!(coursesFound.includes(course.id)))
              {
                coursesFound.push(course.id);

                this.props.setCourseFilter(course.id);

                var existingrecommendationid = '';
                this.props.allcourserecommendations.map((courserecommendation) => {
                  if(courserecommendation.courseid === course.id)
                    existingrecommendationid = courserecommendation.id;
                })

                const userCourse = {userid: userid, 
                  courseid: learningobjective_course.courseid, 
                  learningobjectiveid: learningobjective_course.learningobjectiveid,
                  learningobjectives: [{learningobjectiveid: learningobjective_course.learningobjectiveid, content: learningobjective}],
                  rating: '-1', 
                  counter: '1', 
                  disposition: 'recommended',
                  knowledgearea: course.knowledgearea, 
                  existingrecommendationid: existingrecommendationid,
                  coursename: course.name, 
                  coursedescription: course.description,
                  instructor: course.instructor,
                  fee: course.fee};

                this.props.startAddCourseRecommendation(userCourse);
              }
            }
    
          })
    
        }
      })
    }
    else
    {

      if(isRegistered == true)
      {
        console.log(`isRegistered: ${isRegistered}`)
        this.toggleModal();
        return;
      }
  
      if(pairingId != 0)
      {
        const loPairing = {id: pairingId};
        this.props.startRemoveLOSelectionFromUser(loPairing);

        this.recordSelectionEvent(learningobjectiveid, 'unchecked');

        this.props.allcourserecommendations.map((courserecommendation) => {
           
          var loData = {...courserecommendation.learningobjectives};
          const loKeys = Object.keys(loData).map((key) => loData[key]);
          const numberOfLearningObjectives = loKeys.length;

          Object.keys(loData).map((key) => {

            var currentLO = loData[key];
            const recommendationLoPairing = {recommendation_id: courserecommendation.id, id: key};

            if(currentLO.learningobjectiveid === learningobjectiveid)
            {
              if(numberOfLearningObjectives <= 1)
              {
                const recommendationPairing = {id: courserecommendation.id};
                
                if(numberOfLearningObjectives === 0)
                {
                  // nothing to do
                }
                else
                {
                  this.props.startRemoveCourseSelectedLO(recommendationLoPairing);
                }

                this.props.startRemoveCourseRecommendation(recommendationPairing);
              }
              else
              {
                this.props.startRemoveCourseSelectedLO(recommendationLoPairing);
              }
            }
          });
        })
      }
    }
    this.props.startSetCourseRecommendations();
  };

  getRegistration(courseId) {
    const pairing = this.props.registrations_user.find(p => p.courseid === courseId && p.userid === this.state.userid) || {id:0};
    return pairing;
  }

  getRegistrationId(courseId) {
    const pairing = this.props.registrations_user.find(p => p.courseid === courseId && p.userid === this.state.userid) || {id:0};
    return pairing.id
  }

  getPairing(loId) {
    const pairing = this.props.learningobjective_userselects.find(p => p.learningobjectiveid === loId) || {id:0};
    return pairing.id;
  }

  render() {
    return (
      <div className="content-container-planner-list">
      <div className="list-header">
        <div className="show-for-mobile"></div>
        <div className="show-for-mobile">Learning Outcome</div>
        <div className="show-for-desktop"></div>
        <div className="show-for-desktop">Learning Outcome</div>
      </div>
      <div className="list-body">
        {
          this.props.learningobjectives.length === 0 ? (
            <div className="list-item list-item--message">
              <span>No Learning Objectives</span>
            </div>
          ) : (

              this.props.learningobjectives.map((learningobjective) => {
                if(this.props.id === learningobjective.knowledgeareaid)
                  {
                    const pairingId = this.getPairing(learningobjective.id);

                    learningobjective.selected = false;

                    const registrationId = this.getRegistrationId(learningobjective.courseid);
                    const isRegistered = registrationId != 0
  
                    // if (isRegistered)
                    //   learningobjective.selected = true;

                    if(pairingId != 0)
                      learningobjective.selected = true;

                    return <LearningObjectiveListItem key={learningobjective.id} {...learningobjective} pairingId={pairingId} isRegistered={isRegistered} selectCallback={this.handleChange} />;
                  }
              })
            )
        }
      </div>

      <Modal
      show={this.state.showModal}
      customClass="custom_modal_class"
      >
        <React.Fragment>
          <div>
            <div className="modal-header">
  
              <div className="content-container">
                <h4 className="page-header__title">Registration Accomplished</h4>
              </div>
            </div>
            <div className="content-container">
              <span>
              <Typography style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }} gutterBottom>
                You have already registered for a course that is associated with this Learning Outcome.
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
                    onClick={this.toggleModalWithCancel}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>OK</Typography></Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </span>
  
        </React.Fragment>
      </Modal>
  
    </div>
      )
  }};

const mapDispatchToProps = (dispatch) => ({
  startAddLOSelectionToUser: (loData) => dispatch(startAddLOSelectionToUser(loData)),
  startRemoveLOSelectionFromUser: (loPairing) => dispatch(startRemoveLOSelectionFromUser(loPairing)),
  startAddCourseRecommendation: (userCourse) => dispatch(startAddCourseRecommendation(userCourse)),
  startRemoveCourseRecommendation: (recommendationId) => dispatch(startRemoveCourseRecommendation(recommendationId)),
  startRemoveCourseSelectedLO: (recommendationLoPairing) => dispatch(startRemoveCourseSelectedLO(recommendationLoPairing)),
  startAddRecommendationLearningObjective: (recommendationLoPairing) => dispatch(startAddRecommendationLearningObjective(recommendationLoPairing)),
  setUUIDFilter: (userid) => dispatch(setUUIDFilter(userid)),
  setLOFilter: (learningobjectiveid) => dispatch(setLOFilter(learningobjectiveid)),
  setCourseFilter: (courseid) => dispatch(setCourseFilter(courseid)),
  startSetCourseRecommendations: () => dispatch(startSetCourseRecommendations()),
  startAddUserTimeInModal: (timeInModalCapture) => dispatch(startAddUserTimeInModal(timeInModalCapture)),
  startAddUserSelectionEvent: (selectionEventCapture) => dispatch(startAddUserSelectionEvent(selectionEventCapture))
});

const mapStateToProps = (state) => {
  return {
    learningobjectives: selectLearningObjectives(state.learningobjectives, state.filters),
    learningobjective_courses: selectLOCourses(state.learningobjective_courses,state.filters),
    learningobjective_userselects: selectLOSelectionsForUser(state.learningobjective_userselects, state.filters),
    registrations_user: selectRegistrationsForUser(state.registrations_user, firebase.auth().currentUser.uid),
    allcourserecommendations: state.courserecommendations,
    courserecommendations: selectCourseRecommendations(state.courserecommendations, state.filters),
    courses: selectCourses(state.courses, state.filters),
    filters: state.filters
  };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LearningObjectiveList);