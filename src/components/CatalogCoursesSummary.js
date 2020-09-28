import React from 'react';
import { connect } from 'react-redux';
import selectCourses from '../selectors/knowledgeareacourses';
import selectCoursesTotal from '../selectors/knowledgeareacourses-total';

export const CatalogCoursesSummary = ({ coursesCount, coursesTotal }) => {
  const coursesWord = coursesCount === 1 ? 'course' : 'courses';
  const formattedCoursesTotal = 1;

  return (
    <div className="page-header">
      <div className="content-container">
        <h3 className="page-header__title">Select Courses</h3>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleCourses= selectCourses(state.courses, state.filters);

  return {
    coursesCount: visibleCourses.length,
    coursesTotal: selectLearningObjectivesTotal(visibleCourses)
  };
};

export default connect(mapStateToProps)(CatalogCoursesSummary);