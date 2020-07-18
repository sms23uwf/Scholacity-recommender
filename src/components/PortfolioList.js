import React from 'react';
import { connect } from 'react-redux';
import PortfolioListItem from './PortfolioListItem';
import selectCourseRecommendations from '../selectors/coursecompletions';

const disposition = "accepted";

export const PortfolioList = (props) => (
  <div className="content-container-course">
    <div className="list-header">
      <div className="show-for-mobile">Accepted Recommendations</div>
      <div className="show-for-desktop">Accepted Recommendations</div>
    </div>
    <div className="list-body">
      {
        props.courserecommendations.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No Accepted Course Recommendations</span>
          </div>
        ) : (
            props.courserecommendations.map((courserecommendation) => {
              return <PortfolioListItem key={courserecommendation.id} id={courserecommendation.id} {...courserecommendation} />;
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

export default connect(mapStateToProps)(PortfolioList);
