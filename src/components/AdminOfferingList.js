import React from 'react';
import { connect } from 'react-redux';
import { setUUIDFilter, setCourseFilter } from '../actions/filters';
import AdminOfferingListItem from './AdminOfferingListItem';
import selectRegistrationsForUser from '../selectors/registration_user';
import selectCourses from '../selectors/courses';
import { firebase } from '../firebase/firebase';

export class AdminOfferingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: firebase.auth().currentUser.uid,
      courseid: ''
    }
  }

  getAverageOfferingExpectationRating = (courseId) => {

    var count = 0;
    var total = 0;

    this.props.ratings_course_offerings.map((record) => {
      if (record.courseid == courseId)
      {
        total+= parseInt(record.rating);
        count++;
      }
    });
  
    if (count == 0)
      return 0;

    return parseInt((total/count));

  }


  getAverageCourseSatisfactionRating = (courseId) => {

    var count = 0;
    var total = 0;

    this.props.ratings_course_satisfaction.map((record) => {
      if (record.courseid == courseId)
      {
        total+= parseInt(record.rating);
        count++;
      }
    });

    if (count == 0)
      return 0;

    return parseInt((total/count));

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

                    const avgOfferingRating = this.getAverageOfferingExpectationRating(course.id);
                    const avgCourseRating = this.getAverageCourseSatisfactionRating(course.id);
            
                    return <AdminOfferingListItem key={course.id} id={course.id} {...course} avgOfferingRating={avgOfferingRating} avgCourseRating={avgCourseRating}/>;
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
    ratings_course_offerings: state.ratings_all_course_offerings,
    ratings_course_satisfaction: state.ratings_all_course_satisfaction,
    filters: state.filters
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminOfferingList);
