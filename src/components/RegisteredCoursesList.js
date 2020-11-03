import React from 'react';
import { connect } from 'react-redux';
import RegisteredCoursesListItem from './RegisteredCoursesListItem';
import selectRegistrationsForUser from '../selectors/registration_user';
import selectCourses from '../selectors/courses';
import { firebase } from '../firebase/firebase';


export class RegisteredCoursesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        userid: firebase.auth().currentUser.uid,
        courseid: ''
      }
    }

  getRegistration(courseId) {
    const pairing = this.props.registrations_user.find(p => p.courseid === courseId && p.userid === this.state.userid) || {id:0};
    return pairing;
  }
  
  getCourse(courseId) {
    const pairing = this.props.courses.find(p => p.id === courseId) || {id:0};
    return pairing;
  }


  render() {
    return (

      <div className="content-container-course">
        <div className="list-header">
          <div className="show-for-mobile">My Courses</div>
          <div className="show-for-desktop">My Courses</div>
        </div>
        <div className="list-body">
          {
            this.props.registrations_user.length === 0  ? (
              <div className="list-item list-item--message">
                <span>No Registrations</span>
              </div>
            ) : (


                this.props.registrations_user.map((registration) => {
                  
                  const registration_status = registration.registration_status;

                  if (registration_status == 'approved')
                    return <RegisteredCoursesListItem key={registration.id} {...registration}/>;
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(RegisteredCoursesList);
  