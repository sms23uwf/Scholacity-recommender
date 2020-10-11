import React from 'react';
import { connect } from 'react-redux';
import { setUUIDFilter, setCourseFilter } from '../actions/filters';
import CourseListItem from './CourseListItem';
import selectRegistrationsForUser from '../selectors/registration_user';
import selectCourses from '../selectors/courses';
import selectSessions from '../selectors/sessions';
import { firebase } from '../firebase/firebase';

export class CourseList extends React.Component {
  constructor(props) {
    super(props);
    //props.setUUIDFilter(firebase.auth().currentUser.uid);
  }

  state = {
    userid: firebase.auth().currentUser.uid,
    courseid: ''
   }

  getRegistrationPairing(courseId) {
    const pairing = this.props.registrations_user.find(p => p.courseid === courseId && p.userid === this.state.userid) || {id:0};
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
            this.props.courses.length === 0 ? (
              <div className="list-item list-item--message">
                <span>No Courses</span>
              </div>
            ) : (
                this.props.courses.map((course) => {
                  if(this.props.id === course.knowledgeareaid)
                  {
                    const registrationId = this.getRegistrationPairing(course.id);
                    return <CourseListItem key={course.id} id={course.id} {...course} registrationId={registrationId}/>;
                  }
                })
              )
          }
        </div>
      </div>
    )};
};


const mapDispatchToProps = (dispatch) => ({
  setCourseFilter: (courseid) => dispatch(setCourseFilter(courseid)),
  setUUIDFilter: (userid) => dispatch(setUUIDFilter(userid))
})


const mapStateToProps = (state) => {
  return {
    courses: selectCourses(state.courses, state.filters),
    registrations_user: selectRegistrationsForUser(state.registrations_user, firebase.auth().currentUser.uid),
    filters: state.filters
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
