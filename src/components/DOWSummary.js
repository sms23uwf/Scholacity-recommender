import React from 'react';
import { connect } from 'react-redux';
import selectCoursesByDOW from '../selectors/courses_dow';
import selectCoursesTotal from '../selectors/courses-total';

export const DOWSummary = ({ coursesCount, coursesTotal }) => {
  return (
    <div className="page-header">
      <div className="content-container">
        <h3 className="page-header__title">Select Courses</h3>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleCourses= selectCoursesByDOW(state.courses_by_dow, state.filters);

  return {
    coursesCount: visibleCourses.length,
    coursesTotal: selectCoursesTotal(visibleCourses)
  };
};

export default connect(mapStateToProps)(DOWSummary);
