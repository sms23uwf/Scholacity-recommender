import React from 'react';
import { connect } from 'react-redux';
import { setUUIDFilter, setCourseFilter } from '../actions/filters';
import RegistrationListItem from './RegistrationListItem';
import selectRegistrationsAll from '../selectors/registration_all';
import selectCourses from '../selectors/courses';
import { firebase } from '../firebase/firebase';

export class RegistrationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: firebase.auth().currentUser.uid
     }
    }


  render() {
    return (

      <div className="content-container-course">
        <div className="list-header">
          <div className="show-for-mobile">Registrations</div>
          <div className="show-for-desktop">Registrations</div>
        </div>
        <div className="list-body">
          {
            this.props.registrations_all.length === 0 ? (
              <div className="list-item list-item--message">
                <span>No Registration Requests</span>
              </div>
            ) : (
                this.props.registrations_all.map((registration) => {
                  if(this.props.id === registration.courseid)
                  {
                    return <RegistrationListItem key={registration.id} id={registration.id} {...registration} />;
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
  setUUIDFilter: (userid) => dispatch(setUUIDFilter(userid)),
})


const mapStateToProps = (state) => {
  return {
    courses: selectCourses(state.courses, state.filters),
    registrations_all: selectRegistrationsAll(state.registrations_all, state.filters),
    filters: state.filters
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationList);
