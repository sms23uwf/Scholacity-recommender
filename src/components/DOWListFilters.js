import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, setCourseFilter } from '../actions/filters';
import { startAddUserNavigationEvent } from '../actions/navigationEvents';

let rows = [];

export class DOWListFilters extends React.Component {
  //constructor(props) {
    //super(props);

    state = {
    selectedOption: [{id: 1, label: "Sunday"}]
    };
        rows = this.props.days_of_week.map(item => {
        return item = {'value': item.id, 'label': item.name};
    });
   
    componentDidMount() {
      this.recordNavigationEvent('DOWDashboard');
    }
  
   handleChange = selectedOption => {
      let selectedLabel = selectedOptionllabel;
      this.setState({ selectedOption });
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
  days_of_week: state.days_of_week,
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  setCoursefilter: (courseid) => dispatch(setCourseFilter(courseid)),
  startAddUserNavigationEvent: (navigationEventCapture) => dispatch(startAddUserNavigationEvent(navigationEventCapture))
});

export default connect(mapStateToProps, mapDispatchToProps)(DOWListFilters);
