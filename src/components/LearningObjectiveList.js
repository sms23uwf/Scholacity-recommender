import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import LearningObjectiveListItem from './LearningObjectiveListItem';
import selectLearningObjectives from '../selectors/learningobjectives';
import selectLOSelectionsForUser from '../selectors/learningobjective_userselect';
import selectLOCourses from '../selectors/learningobjective_course';
import selectCourses from '../selectors/courses';
import { startAddLOSelectionToUser, startRemoveLOSelectionFromUser } from '../actions/learningobjective_userselect';
import { startAddCourseRecommendation , startRemoveCourseRecommendation} from '../actions/courseRecommendations';
import { startAddRecommendationLearningObjective , startRemoveRecommendationLearningObjective} from '../actions/recommendation_learningobjective';
import { firebase } from '../firebase/firebase';
import database from '../firebase/firebase';
import { setUUIDFilter, setLOFilter, setCourseFilter } from '../actions/filters';
import selectCourseRecommendations, {findExistingCourseRecommendation} from '../selectors/courserecommendations';
import { startSetCourseRecommendations } from '../actions/courseRecommendations';
import { startAddUserSelectionEvent } from '../actions/selectionEvent';

export class LearningObjectiveList extends React.Component {
  constructor(props) {
    super(props);
    props.setUUIDFilter(firebase.auth().currentUser.uid);
  }

  state = {
    userid: firebase.auth().currentUser.uid,
    learningobjectiveid: ''
   }
 
   recordSelectionEvent = (loId, eventDisposition) => {
    let timeStamp = Date.now();

    const selectionEventCapture = {timestamp: timeStamp, learningobjectiveid: loId, disposition: eventDisposition};
    this.props.startAddUserSelectionEvent(selectionEventCapture);
  }

  handleChange = (learningobjectiveid,learningobjective,pairingId,knowledgearea,e) => {

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
                  courseid: learningobjective_course.courseid, 
                  learningobjectiveid: learningobjective_course.learningobjectiveid,
                  learningobjectives: [{learningobjectiveid: learningobjective_course.learningobjectiveid, content: learningobjective}],
                  portfolioobjectives: [{learningobjectiveid: learningobjective_course.learningobjectiveid, content: learningobjective}],
                  rating: '-1', 
                  counter: '1', 
                  disposition: 'recommended',
                  knowledgearea: course.knowledgearea, 
                  existingrecommendationid: existingrecommendationid,
                  coursename: course.name, 
                  coursedescription: course.description};

                this.props.startAddCourseRecommendation(userCourse);
                this.props.startSetCourseRecommendations();
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
                  database.ref(`users_tables/${this.state.userid}/courserecommendation/${courserecommendation.id}`).child(`learningobjectives/${key}`).remove().then(() => {
                    this.props.startSetCourseRecommendations();
                  });
                }

                if(courserecommendation.disposition != "Portfolio")
                {
                  this.props.startRemoveCourseRecommendation(recommendationPairing);
                  this.props.startSetCourseRecommendations();
                }
              }
              else
              {
                database.ref(`users_tables/${this.state.userid}/courserecommendation/${courserecommendation.id}`).child(`learningobjectives/${key}`).remove().then(() => {
                  this.props.startSetCourseRecommendations();
                });
              }
            }
          });
        })
      }
    }
    
    
  };

  getPairing(loId) {
    const pairing = this.props.learningobjective_userselects.find(p => p.learningobjectiveid === loId) || {id:0};
    return pairing.id;
  }

  render() {
    return (
      <div className="content-container">
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
                
                if(this.props.content === learningobjective.knowledgearea)
                  {
                    const pairingId = this.getPairing(learningobjective.id);

                    learningobjective.selected = false;

                    if(pairingId != 0)
                      learningobjective.selected = true;

                    return <LearningObjectiveListItem key={learningobjective.id} {...learningobjective} pairingId={pairingId} selectCallback={this.handleChange} />;
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
  startAddRecommendationLearningObjective: (recommendationLoPairing) => dispatch(startAddRecommendationLearningObjective(recommendationLoPairing)),
  setUUIDFilter: (userid) => dispatch(setUUIDFilter(userid)),
  setLOFilter: (learningobjectiveid) => dispatch(setLOFilter(learningobjectiveid)),
  setCourseFilter: (courseid) => dispatch(setCourseFilter(courseid)),
  startSetCourseRecommendations: () => dispatch(startSetCourseRecommendations()),
  startAddUserSelectionEvent: (selectionEventCapture) => dispatch(startAddUserSelectionEvent(selectionEventCapture))
});

const mapStateToProps = (state) => {
  return {
    learningobjectives: selectLearningObjectives(state.learningobjectives, state.filters),
    learningobjective_courses: selectLOCourses(state.learningobjective_courses,state.filters),
    learningobjective_userselects: selectLOSelectionsForUser(state.learningobjective_userselects, state.filters),
    allcourserecommendations: state.courserecommendations,
    courserecommendations: selectCourseRecommendations(state.courserecommendations, state.filters),
    courses: selectCourses(state.courses, state.filters),
    filters: state.filters
  };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LearningObjectiveList);