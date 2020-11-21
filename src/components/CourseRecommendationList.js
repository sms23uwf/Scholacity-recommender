import React from 'react';
import { connect } from 'react-redux';
import CourseRecommendationListItem from './CourseRecommendationListItem';
import selectCourseRecommendations from '../selectors/courserecommendations';
import selectRegistrationsForUser from '../selectors/registration_user';
import selectSessions from '../selectors/sessions';
import { firebase } from '../firebase/firebase';

export class CourseRecommendationsList extends React.Component {
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

  getRegistrationStatus(courseId) {
    const pairing = this.props.registrations_user.find(p => p.courseid === courseId && p.userid === this.state.userid) || {id:0};
    return pairing.registration_status;
  }

  getRegistration(courseId) {
    const pairing = this.props.registrations_user.find(p => p.courseid === courseId && p.userid === this.state.userid) || {id:0};
    return pairing;
  }
  
  render() {
    return (

      <div className="content-container-course">
        <div className="list-header">
          <div className="show-for-mobile">Course Recommendations</div>
          <div className="show-for-desktop">Course Recommendations</div>
        </div>
        <div className="list-body">
          {
            this.props.courserecommendations.length === 0 ? (
              <div className="list-item list-item--message">
                <span>No Course Recommendations</span>
              </div>
            ) : (
                this.props.courserecommendations.map((courserecommendation) => {
                  
                  const registrationRecord = this.getRegistration(courserecommendation.courseid);
                  const registrationId = registrationRecord.id;
                  const registration_status = registrationRecord.registration_status;
                  

                  if (registration_status != 'approved')
                    return <CourseRecommendationListItem key={courserecommendation.id} id={courserecommendation.id} {...courserecommendation} registrationId={registrationId}/>;
                })
              )
          }
        </div>
      </div>
    )};      
  };

  const mapDispatchToProps = (dispatch) => ({
    setUUIDFilter: (userid) => dispatch(setUUIDFilter(userid))
  })
  
  
  const mapStateToProps = (state) => {
    return {
      courserecommendations: selectCourseRecommendations(state.courserecommendations),
      registrations_user: selectRegistrationsForUser(state.registrations_user, firebase.auth().currentUser.uid),
      filters: state.filters
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CourseRecommendationsList); 
