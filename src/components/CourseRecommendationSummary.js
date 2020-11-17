import React from 'react';
import { connect } from 'react-redux';
import selectCourseRecommendationsTotal from '../selectors/courserecommendations-total';

export const CourseRecommendationsSummary = ({ courseRecommendationCount, courseRecommendationTotal }) => {

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title"></h1>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {

  return {
    courseRecommendationsTotal: selectCourseRecommendationsTotal(state.courserecommendations)
  };
};

export default connect(mapStateToProps)(CourseRecommendationsSummary);
