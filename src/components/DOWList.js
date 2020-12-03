import React from 'react';
import { connect } from 'react-redux';
import { setUUIDFilter, setCourseFilter } from '../actions/filters';
import DOWListItem from './DOWListItem';
import selectRegistrationsForUser from '../selectors/registration_user';
import selectCoursesByDOW from '../selectors/courses_dow';
import selectCourses from '../selectors/courses';
import { firebase } from '../firebase/firebase';

export class DOWList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        userid: firebase.auth().currentUser.uid,
        current_dow: props.name        
    }
    //props.setUUIDFilter(firebase.auth().currentUser.uid);
  }

  getRegistrationPairing(courseId) {
    const pairing = this.props.registrations_user.find(p => p.courseid === courseId && p.userid === this.state.userid) || {id:0};
    return pairing.id;
  }
  
  getRegistration(courseId) {
    const pairing = this.props.registrations_user.find(p => p.courseid === courseId && p.userid === this.state.userid) || {id:0};
    return pairing;
  }

  getCourse(courseId) {
    const pairing = this.props.courses.find(p => p.id === courseId) || {id:0};
    return pairing;
  }

  getSelectionPairing(courseId) {
    const pairing = this.props.courseselections.find(p => p.courseid === courseId && p.userid === this.state.userid) || {id:0};
    return pairing.id;
  }

  render() {
    return (

      <div className="content-container-course">
        <div className="list-header">
          <div className="show-for-mobile">Courses</div>
          <div className="show-for-desktop">Courses</div>
        </div>
        <div className="list-body">
          {
            this.props.courses_by_dow.length === 0 ? (
              <div className="list-item list-item--message">
                <span>No Courses</span>
              </div>
            ) : (
                this.props.courses_by_dow.map((course_by_dow) => {
                  if(this.props.name === course_by_dow.DOW)
                  {

                    const registrationRecord = this.getRegistration(course_by_dow.courseid);
                    const registrationId = registrationRecord.id;
                    const registration_status = registrationRecord.registration_status;

                    const matchingCourse = this.getCourse(course_by_dow.courseid);
                    const selectionId = this.getSelectionPairing(course_by_dow.courseid);
                    
                    if (matchingCourse.id != 0)
                      return <DOWListItem key={course_by_dow.id} id={course_by_dow.id} {...matchingCourse} registrationId={registrationId} registration_status={registration_status} selectionId={selectionId}/>;
                  }
                })
              )
          }
        </div>
      </div>
    )};
};


const mapDispatchToProps = (dispatch) => ({
  setDOWFilter: (dow) => dispatch(setDOWFilter(dow)),
  setUUIDFilter: (userid) => dispatch(setUUIDFilter(userid))
})


const mapStateToProps = (state) => {
  return {
    courseselections: state.courseselections,
    courses: selectCourses(state.courses, state.filters),
    courses_by_dow: selectCoursesByDOW(state.courses_by_dow, state.filters),
    registrations_user: selectRegistrationsForUser(state.registrations_user, firebase.auth().currentUser.uid),
    filters: state.filters
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DOWList);
