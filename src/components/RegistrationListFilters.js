import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, setCourseFilter } from '../actions/filters';
import selectKnowledgeAreas from '../selectors/knowledgeareas';
import selectCourses from '../selectors/courses';
import { startAddUserNavigationEvent } from '../actions/navigationEvents';

let rows = [];

export class RegistrationListFilters extends React.Component {
  //constructor(props) {
    //super(props);

    componentDidMount() {
      this.recordNavigationEvent('AdminDashboard');
    }
  
   handleChange = selectedOption => {
      let selectedLabel = '';
      selectedOption.forEach(course => {
        selectedLabel = course.name;
      })

      this.setState({ selectedOption });
      var first = selectedOption[0];
      this.props.setTextFilter(selectedLabel);
  };

  recordNavigationEvent = (event) => {
    let timeStamp = Date.now();

    const navigationEventCapture = {timestamp: timeStamp, event: event};
    this.props.startAddUserNavigationEvent(navigationEventCapture);
  }

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  knowledgeareas: selectKnowledgeAreas(state.knowledgeareas, state.filters),
  courses: selectCourses(state.courses, state.filters),
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  setCoursefilter: (courseid) => dispatch(setCourseFilter(courseid)),
  startAddUserNavigationEvent: (navigationEventCapture) => dispatch(startAddUserNavigationEvent(navigationEventCapture))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationListFilters);
