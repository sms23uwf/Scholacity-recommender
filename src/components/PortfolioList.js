import React from 'react';
import { connect } from 'react-redux';
import PortfolioListItem from './PortfolioListItem';
import selectCourseRecommendations from '../selectors/courserecommendations';
import selectRegistrationsForUser from '../selectors/registration_user';
import { firebase } from '../firebase/firebase';

const disposition = "accepted";

export class PortfolioList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: firebase.auth().currentUser.uid,
      courseid: ''
    }
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
          <div className="show-for-mobile">Approved</div>
          <div className="show-for-desktop">Approved Registrations</div>
        </div>
        <div className="list-body">
          {
            this.props.courserecommendations.length === 0 ? (
              <div className="list-item list-item--message">
                <span>No Approved Registrations</span>
              </div>
            ) : (
                this.props.courserecommendations.map((courserecommendation) => {

                  const registration_status = this.getRegistrationStatus(courserecommendation.courseid);
                  if (registration_status == 'approved')
                    return <PortfolioListItem key={courserecommendation.id} id={courserecommendation.id} {...courserecommendation} />;
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
        courserecommendations: selectCourseRecommendations(state.courserecommendations, state.filters),
        registrations_user: selectRegistrationsForUser(state.registrations_user, firebase.auth().currentUser.uid),
        filters: state.filters
      };
    };
    
  export default connect(mapStateToProps, mapDispatchToProps)(PortfolioList); 
  
