import React from 'react';
import { connect } from 'react-redux';
import { setDispositionFilter, sortByKnowledgeArea, sortByContent } from '../actions/filters';
import { startAddUserNavigationEvent } from '../actions/navigationEvents';

export class CourseSelectionListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.props.setDispositionFilter('completed');
  }
  state = {
    disposition: 'completed'
  };

  componentDidMount() {
    this.recordNavigationEvent('SelectionsDashboard');
  };

  recordNavigationEvent = (event) => {
    let timeStamp = Date.now();

    const navigationEventCapture = {timestamp: timeStamp, event: event};
    this.props.startAddUserNavigationEvent(navigationEventCapture);
  };

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
    setDispositionFilter();
  }
  onSortChange = (e) => {
    if (e.target.value === 'knowledgearea') {
      this.props.sortByKnowledgeArea();
    } else if (e.target.value === 'content') {
      this.props.sortByContent();
    }
  };
  render() {
    return (
      <div className="content-container">
        <div className="input-group">
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setDispositionFilter: (disposition) => dispatch(setDispositionFilter(disposition)),
  sortByContent: () => dispatch(sortByContent()),
  sortByKnowledgeArea: () => dispatch(sortByKnowledgeArea()),
  startAddUserNavigationEvent: (navigationEventCapture) => dispatch(startAddUserNavigationEvent(navigationEventCapture))
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseSelectionListFilters);
