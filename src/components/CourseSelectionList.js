import React from 'react';
import { connect } from 'react-redux';
import CourseSelectionListItem from './CourseSelectionListItem';
import selectRegistrationsForUser from '../selectors/registration_user';
import SelectCourseSelections from '../selectors/courseselections';
import { firebase } from '../firebase/firebase';


export class CourseSelectionList extends React.Component {
  constructor(props) {
    super(props);
    //props.setUUIDFilter(firebase.auth().currentUser.uid);
  }

  state = {
    userid: firebase.auth().currentUser.uid,
    courseid: ''
   }

  getRegistration(courseId) {
    const pairing = this.props.registrations_user.find(p => p.courseid === courseId && p.userid === this.state.userid) || {id:0};
    return pairing;
  }
  
  render() {
    return (

      <div className="content-container-course">
        <div className="list-header">
          <div className="show-for-mobile">Course Selections</div>
          <div className="show-for-desktop">Course Selections</div>
        </div>
        <div className="list-body">
          {
            this.props.courseselections.length === 0 ? (
              <div className="list-item list-item--message">
                <span>No Course Selections</span>
              </div>
            ) : (
                this.props.courseselections.map((courseselection) => {
                  
                  const registrationRecord = this.getRegistration(courserecommendation.courseid);
                  const registrationId = registrationRecord.id;
                  const registration_status = registrationRecord.registration_status;


                  if (registration_status != 'approved')
                    return <CourseSelectionListItem key={courseselection.id} id={courseselection.id} {...courseselection} registrationId={registrationId}/>;
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
      courseselections: SelectCourseSelections(state.courseselections, state.filters),
      registrations_user: selectRegistrationsForUser(state.registrations_user, firebase.auth().currentUser.uid),
      filters: state.filters
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CourseSelectionList);
  