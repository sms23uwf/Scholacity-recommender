import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import Collapsible from './Collapsible';
import selectKnowledgeAreas from '../selectors/knowledgeareas';
import selectCourses from '../selectors/courses';
import selectRegistrationsAll from '../selectors/registration_all';
import RegistrationList from './RegistrationList';

 export const RegistrationsCollapsible = (props) => (
    props.courses.map((course, key) => {
        return (
            <div key={key} className="content-container-planner">
                <Collapsible key={course.id} title={course.name}>
                    <RegistrationList key={course.id} {...course} />
                </Collapsible>
            </div>
        )
    })
  );
  
  const mapStateToProps = (state) => {
    return {
      courses: selectCourses(state.courses, state.filters),
      knowledgeareas: selectKnowledgeAreas(state.knowledgeareas, state.filters),
      registrations: selectRegistrationsAll(state.registrations_all, state.filters),
      checkboxChecked: false
    };
  };
  
  export default connect(mapStateToProps)(RegistrationsCollapsible);