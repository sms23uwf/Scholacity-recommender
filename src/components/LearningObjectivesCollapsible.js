import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import Collapsible from './Collapsible';
import selectKnowledgeAreas from '../selectors/knowledgeareas';
import selectLearningObjectives from '../selectors/learningobjectives';
import LearningObjectiveList from './LearningObjectiveList';

 export const LearningObjectivesCollapsible = (props) => (
    props.knowledgeareas.map((knowledgearea, key) => {
        return (
            <div key={key} className="content-container-planner">
                <Collapsible key={knowledgearea.id} title={knowledgearea.content}>
                    <LearningObjectiveList key={knowledgearea.id} {...knowledgearea} />
                </Collapsible>
            </div>
        )
    })
  );
  
  const mapStateToProps = (state) => {
    return {
      learningobjectives: selectLearningObjectives(state.learningobjectives, state.filters),
      knowledgeareas: selectKnowledgeAreas(state.knowledgeareas, state.filters),
      checkboxChecked: false
    };
  };
  
  export default connect(mapStateToProps)(LearningObjectivesCollapsible);