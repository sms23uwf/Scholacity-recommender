import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import Collapsible from './Collapsible';
import selectKnowledgeAreas from '../selectors/knowledgeareas';
import selectCourses from '../selectors/courses';
import CourseList from './MaintenanceList';

 export const MaintenanceCollapsible = (props) => (
    props.knowledgeareas.map((knowledgearea, key) => {
        return (
            <div key={key} className="content-container-planner">
                <Collapsible key={knowledgearea.id} title={knowledgearea.content}>
                    <CourseList key={knowledgearea.id} {...knowledgearea} />
                </Collapsible>
            </div>
        )
    })
  );
  
  const mapStateToProps = (state) => {
    return {
      courses: selectCourses(state.courses, state.filters),
      knowledgeareas: selectKnowledgeAreas(state.knowledgeareas, state.filters),
      checkboxChecked: false
    };
  };
  
  export default connect(mapStateToProps)(MaintenanceCollapsible);