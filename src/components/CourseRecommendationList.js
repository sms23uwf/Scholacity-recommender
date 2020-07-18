import React from 'react';
import { connect } from 'react-redux';
import CourseRecommendationListItem from './CourseRecommendationListItem';
import selectCourseRecommendations from '../selectors/courserecommendations';

export const CourseRecommendationsList = (props) => (
  <div className="content-container-course">
    <div className="list-header">
      <div className="show-for-mobile">Course Recommendations</div>
      <div className="show-for-desktop">Course Recommendations</div>
    </div>
    <div className="list-body">
      {
        props.courserecommendations.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No Course Recommendations</span>
          </div>
        ) : (
            props.courserecommendations.map((courserecommendation) => {
              return <CourseRecommendationListItem key={courserecommendation.id} id={courserecommendation.id} {...courserecommendation}/>;
            })
          )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    courserecommendations: selectCourseRecommendations(state.courserecommendations, state.filters)
  };
};

export default connect(mapStateToProps)(CourseRecommendationsList);
