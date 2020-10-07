import React from 'react';
import { connect } from 'react-redux';
import { setUUIDFilter, setCourseFilter } from '../actions/filters';
import CourseListItem from './CourseListItem';
import {startSetCourses } from '../actions/courses';
import selectCourses from '../selectors/courses';

export const CourseList = (props) => (
  <div className="content-container-course">
    <div className="list-header">
      <div className="show-for-mobile">Courses</div>
      <div className="show-for-desktop">Courses</div>
    </div>
    <div className="list-body">
      {
        props.courses.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No Courses</span>
          </div>
        ) : (
            props.courses.map((course) => {
              if(props.id === course.knowledgeareaid)
                return <CourseListItem key={course.id} id={course.id} {...course}/>;
            })
          )
      }
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  setCourseFilter: (courseid) => dispatch(setCourseFilter(courseid)),
  startSetCourses: () => dispatch(startSetCourses())
})


const mapStateToProps = (state) => {
  return {
    courses: selectCourses(state.courses, state.filters)
  };
};

export default connect(mapStateToProps)(CourseList);
