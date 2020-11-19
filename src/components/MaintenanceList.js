import React from 'react';
import { connect } from 'react-redux';
import { setUUIDFilter, setCourseFilter } from '../actions/filters';
import MaintenanceListItem from './MaintenanceListItem';
import selectRegistrationsForUser from '../selectors/registration_user';
import selectCourses from '../selectors/courses';
import { firebase } from '../firebase/firebase';

export class MaintenanceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: firebase.auth().currentUser.uid,
      courseid: ''
    }
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
                    return <MaintenanceListItem key={course.id} id={course.id} {...course} />;
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
    filters: state.filters
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceList);
