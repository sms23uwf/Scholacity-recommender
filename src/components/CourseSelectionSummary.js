import React from 'react';
import { connect } from 'react-redux';
import selectCourseSelections from '../selectors/courseselections';
import selectCourseSelectionsTotal from '../selectors/courseselections-total';

export const CourseSelectionsSummary = ({ courseSelectionCount, courseSelectionTotal }) => {
  const courseSelectionWord = courseSelectionCount === 1 ? 'course selection' : 'course selections';
  const formattedCourseSelectionsTotal = 1;

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title"></h1>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleCourseSelections = selectCourseSelections(state.courseselections, state.filters);

  return {
    courseSelectionsCount: visibleCourseSelections.length,
    courseSelectionsTotal: selectCourseSelectionsTotal(visibleCourseSelections)
  };
};

export default connect(mapStateToProps)(CourseSelectionsSummary);
