import React from 'react';
import { connect } from 'react-redux';
import selectCourses from '../selectors/courses';
import selectCoursesTotal from '../selectors/courses-total';

export const RegistrationSummary = ({ coursesCount, coursesTotal }) => {
  return (
    <div className="page-header">
      <div className="content-container">
        <h3 className="page-header__title">Registrations</h3>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleCourses= selectCourses(state.courses, state.filters);

  return {
    coursesCount: visibleCourses.length,
    coursesTotal: selectCoursesTotal(visibleCourses)
  };
};

export default connect(mapStateToProps)(RegistrationSummary);
