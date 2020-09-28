import React from 'react';
import { connect } from 'react-redux';
import CourseSelectionListItem from './CourseSelectionListItem';
import SelectCourseSelections from '../selectors/courseselections';

export const CourseSelectionsList = (props) => (
  <div className="content-container-course">
    <div className="list-header">
      <div className="show-for-mobile">Course Selections</div>
      <div className="show-for-desktop">Course Selections</div>
    </div>
    <div className="list-body">
      {
        props.courseselections.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No Course Selections</span>
          </div>
        ) : (
            props.courseselections.map((courseselection) => {
              return <CourseSelectionListItem key={courseselection.id} id={courseselection.id} {...courseselection}/>;
            })
          )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    courseselections: SelectCourseSelections(state.courseselections, state.filters)
  };
};

export default connect(mapStateToProps)(CourseSelectionsList);
