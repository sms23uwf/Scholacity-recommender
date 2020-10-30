import React from 'react';
import { connect } from 'react-redux';
import { setUUIDFilter, setCourseFilter } from '../actions/filters';
import OfferingListItem from './OfferingListItem';
import selectRegistrationsForUser from '../selectors/registration_user';
import selectCourses from '../selectors/courses';
import { firebase } from '../firebase/firebase';

export class OfferingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: firebase.auth().currentUser.uid,
      courseid: ''
    }
  }

  getRegistrationPairing(courseId) {
    const pairing = this.props.registrations_user.find(p => p.courseid === courseId && p.userid === this.state.userid) || {id:0};
    return pairing.id;
  }
  
  getRegistration(courseId) {
    const pairing = this.props.registrations_user.find(p => p.courseid === courseId && p.userid === this.state.userid) || {id:0};
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
            this.props.courses.length === 0 ? (
              <div className="list-item list-item--message">
                <span>No Courses</span>
              </div>
            ) : (
                this.props.courses.map((course) => {
                  if(this.props.id === course.knowledgeareaid)
                  {

                    const registrationRecord = this.getRegistration(course.id);
                    const registrationId = registrationRecord.id;
                    const registration_status = registrationRecord.registration_status;
                    const selectionId = this.getSelectionPairing(course.id);
  
                    return <OfferingListItem key={course.id} id={course.id} {...course} registrationId={registrationId} registration_status={registration_status} selectionId={selectionId}/>;
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
    courseselections: state.courseselections,
    courses: selectCourses(state.courses, state.filters),
    registrations_user: selectRegistrationsForUser(state.registrations_user, firebase.auth().currentUser.uid),
    filters: state.filters
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferingList);
