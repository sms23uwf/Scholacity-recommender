import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, setCourseFilter } from '../actions/filters';
import selectKnowledgeAreas from '../selectors/knowledgeareas';
import { startAddUserNavigationEvent } from '../actions/navigationEvents';

let rows = [];

export class OfferingListFilters extends React.Component {
  //constructor(props) {
    //super(props);

   state = {
     selectedOption: [{id: 1, label: "Arts and Literature"}]
    };
      rows = this.props.knowledgeareas.map(item => {
        return item = {'value': item.id, 'label': item.content};
     });

    componentDidMount() {
      this.recordNavigationEvent('CoursesDashboard');
    }
  
   handleChange = selectedOption => {
      let selectedLabel = '';
      selectedOption.forEach(knowledearea => {
        selectedLabel = knowledearea.label;
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

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  }
  onTextChange = (e) => {
    this.props.setTextFilter(e);
  };

  render() {
    const { selectedOption } = this.state;
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
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  setCoursefilter: (courseid) => dispatch(setCourseFilter(courseid)),
  startAddUserNavigationEvent: (navigationEventCapture) => dispatch(startAddUserNavigationEvent(navigationEventCapture))
});

export default connect(mapStateToProps, mapDispatchToProps)(OfferingListFilters);
