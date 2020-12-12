import React from 'react';
import { connect } from 'react-redux';
import selectLearningObjectives from '../selectors/learningobjectives';
import selectLearningObjectivesTotal from '../selectors/learningobjectives-total';

export const AdminLearningObjectivesSummary = ({ learningObjectivesCount, learningObjectivesTotal }) => {
  const learningObjectivesWord = learningObjectivesCount === 1 ? 'learning objective' : 'learning objectives';
  const formattedLearningObjectivesTotal = 1;

  return (
    <div className="page-header">
      <div className="content-container">
        <h3 className="page-header__title">View Learning Objectives</h3>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleLearningObjectives= selectLearningObjectives(state.learningobjectives, state.filters);

  return {
    learningObjectivesCount: visibleLearningObjectives.length,
    learningObjectivesTotal: selectLearningObjectivesTotal(visibleLearningObjectives)
  };
};

export default connect(mapStateToProps)(AdminLearningObjectivesSummary);
