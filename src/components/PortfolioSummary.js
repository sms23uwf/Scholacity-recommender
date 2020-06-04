import React from 'react';
import { connect } from 'react-redux';
import selectCourseRecommendations from '../selectors/courserecommendations';
import selectCourseRecommendationsTotal from '../selectors/courserecommendations-total';


export const PortfolioSummary = ({ courseRecommendationCount, courseRecommendationTotal }) => {
  const courseRecommendationWord = courseRecommendationCount === 1 ? 'course completion' : 'course completions';
  const formattedCourseRecommendationsTotal = 1;

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title"></h1>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleCourseRecommendations = selectCourseRecommendations(state.courserecommendations, state.filters);

  return {
    courseRecommendationsCount: visibleCourseRecommendations.length,
    courseRecommendationsTotal: selectCourseRecommendationsTotal(visibleCourseRecommendations)
  };
};

export default connect(mapStateToProps)(PortfolioSummary);