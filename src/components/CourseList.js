import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import CourseListItem from './CourseListItem';
import selectCourses from '../selectors/courses';
import selectCourseSelectionsForUser from '../selectors/course_userselect';
import { startAddCourseSelectionToUser, startRemoveCourseSelectionFromUser } from '../actions/course_userselect';
import { startAddCourseSelection , startRemoveCourseSelection} from '../actions/courseSelections';
import { startAddRecommendationLearningObjective , startRemoveRecommendationLearningObjective} from '../actions/recommendation_learningobjective';
import { firebase } from '../firebase/firebase';
import database from '../firebase/firebase';
import { setUUIDFilter, setCourseFilter } from '../actions/filters';
import selectCourseSelections, {findExistingCourseSelection} from '../selectors/courseselections';
import { startSetCourseSelections } from '../actions/courseSelections';
import { startAddUserSelectionEvent } from '../actions/selectionEvent';

export class CourseList extends React.Component {
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
  handleChange = (courseid, knowledgeareaid, coursename, coursedescription, pairingId, e) => {

    this.setState(() => ({courseid}));
    this.props.setCourseFilter(courseid);

    if(e.target.checked===true)
    {
      const userid = firebase.auth().currentUser.uid;
      const courseData = {courseid: courseid, userid: userid};

      this.recordSelectionEvent(courseid, 'checked');

      this.props.startAddCourseSelectionToUser(courseData);

      var coursesFound = [];

      const userCourse = {userid: userid, 
        courseid: courseid, 
        rating: '-1', 
        counter: '1', 
        disposition: 'selected',
        knowledgearea: knowledgeareaid, 
        existingrecommendationid: '',
        coursename: coursename, 
        coursedescription: coursedescription};

      this.props.startAddCourseSelection(userCourse);
      this.props.startSetCourseSelections();
    }
    else
    {
      if(pairingId != 0)
      {
        const coursePairing = {id: pairingId};
        this.props.startRemoveCourseSelectionFromUser(coursePairing);

        this.recordSelectionEvent(courseid, 'unchecked');

        this.props.allcourserecommendations.map((courserecommendation) => {
           
          if (courserecommendation.courseId == courseid)
            this.props.startRemoveCourseRecommendation(recommendationPairing);
            this.props.startSetCourseRecommendations();
        })
      }
    }
  };

  getPairing(courseId) {
    const pairing = this.props.course_userselects.find(p => p.courseid === courseId) || {id:0};
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
          this.props.courses.length === 0 ? (
            <div className="list-item list-item--message">
              <span>No Courses</span>
            </div>
          ) : (
              this.props.courses.map((course) => {
                if(this.props.id === course.knowledgeareaid)
                  {
                    const pairingId = this.getPairing(course.id);

                    course.selected = false;

                    if(pairingId != 0)
                      course.selected = true;

                    return <CourseListItem key={course.id} {...course} pairingId={pairingId} selectCallback={this.handleChange} />;
                  }
              })
            )
        }
      </div>
    </div>
      )
  }};

const mapDispatchToProps = (dispatch) => ({
  startAddCourseSelectionToUser: (courseData) => dispatch(startAddCourseSelectionToUser(courseData)),
  startRemoveLOSelectionFromUser: (coursePairing) => dispatch(startRemoveLOSelectionFromUser(coursePairing)),
  startAddCourseSelection: (userCourse) => dispatch(startAddCourseSelection(userCourse)),
  startRemoveCourseSelection: (selectionId) => dispatch(startRemoveCourseSelection(selectionId)),
  setUUIDFilter: (userid) => dispatch(setUUIDFilter(userid)),
  setCourseFilter: (courseid) => dispatch(setCourseFilter(courseid)),
  startSetCourseSelections: () => dispatch(startSetCourseSelections()),
  startAddUserSelectionEvent: (selectionEventCapture) => dispatch(startAddUserSelectionEvent(selectionEventCapture))
});

const mapStateToProps = (state) => {
  return {
    course_userselects: selectCourseSelectionsForUser(state.course_userselects, state.filters),
    allcourseselections: state.courseselections,
    courseselections: selectCourseSelections(state.courseselections, state.filters),
    courses: selectCourses(state.courses, state.filters),
    filters: state.filters
  };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(CourseList);