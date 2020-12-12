import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import AdminLearningObjectiveListItem from './AdminLearningObjectiveListItem';
import selectLearningObjectives from '../selectors/learningobjectives';
import selectLOSelectionsForUser from '../selectors/learningobjective_userselect';
import selectLOCourses from '../selectors/learningobjective_course';
import selectCourses from '../selectors/courses';
import selectRegistrationsForUser from '../selectors/registration_user';
import { startAddUserTimeInModal } from '../actions/timeInModal';
import { startAddLOSelectionToUser, startRemoveLOSelectionFromUser } from '../actions/learningobjective_userselect';
import { startAddCourseRecommendation , startRemoveCourseRecommendation, startRemoveCourseSelectedLO} from '../actions/courseRecommendations';
import { firebase } from '../firebase/firebase';
import database from '../firebase/firebase';
import { setUUIDFilter, setLOFilter, setCourseFilter } from '../actions/filters';
import selectCourseRecommendations, {findExistingCourseRecommendation} from '../selectors/courserecommendations';
import { startAddUserSelectionEvent } from '../actions/selectionEvent';
import Modal from './Modal';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export class AdminLearningObjectiveList extends React.Component {
  constructor(props) {
    super(props);
    props.setUUIDFilter(firebase.auth().currentUser.uid);
    this.state = {
      showModal: false,
      currentRating: 0,
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

  handleChange = (learningobjectiveid,learningobjective,pairingId,knowledgearea,isRegistered,e) => {

    this.setState(() => ({learningobjectiveid}));
    this.props.setLOFilter(learningobjectiveid);

    if(e.target.checked===true)
    {

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
                  courseid: course.id, 
                  learningobjectiveid: learningobjective_course.learningobjectiveid,
                  learningobjectives: [{learningobjectiveid: learningobjective_course.learningobjectiveid, content: learningobjective}],
                  rating: 0, 
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
  
                    if(pairingId != 0)
                      learningobjective.selected = true;

                    return <AdminLearningObjectiveListItem key={learningobjective.id} {...learningobjective} pairingId={pairingId} isRegistered={isRegistered} selectCallback={this.handleChange} />;
                  }
              })
            )
        }
      </div>
    </div>
      )
  }};

const mapDispatchToProps = (dispatch) => ({
  startAddLOSelectionToUser: (loData) => dispatch(startAddLOSelectionToUser(loData)),
  startRemoveLOSelectionFromUser: (loPairing) => dispatch(startRemoveLOSelectionFromUser(loPairing)),
  startAddCourseRecommendation: (userCourse) => dispatch(startAddCourseRecommendation(userCourse)),
  startRemoveCourseRecommendation: (recommendationId) => dispatch(startRemoveCourseRecommendation(recommendationId)),
  startRemoveCourseSelectedLO: (recommendationLoPairing) => dispatch(startRemoveCourseSelectedLO(recommendationLoPairing)),
  setUUIDFilter: (userid) => dispatch(setUUIDFilter(userid)),
  setLOFilter: (learningobjectiveid) => dispatch(setLOFilter(learningobjectiveid)),
  setCourseFilter: (courseid) => dispatch(setCourseFilter(courseid)),
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
  
export default connect(mapStateToProps, mapDispatchToProps)(AdminLearningObjectiveList);