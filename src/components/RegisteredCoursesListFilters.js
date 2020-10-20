import React from 'react';
import { connect } from 'react-redux';
import { setDispositionFilter, sortByKnowledgeArea, sortByContent } from '../actions/filters';
import { startAddUserNavigationEvent } from '../actions/navigationEvents';

export class RegisteredCoursesListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.props.setDispositionFilter('Registered');
  }
  state = {
    disposition: 'Registered'
  };

  componentDidMount() {
    this.recordNavigationEvent('SelectionsDashboard');
  };

  recordNavigationEvent = (event) => {
    let timeStamp = Date.now();

    const navigationEventCapture = {timestamp: timeStamp, event: event};
    this.props.startAddUserNavigationEvent(navigationEventCapture);
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
  startAddUserNavigationEvent: (navigationEventCapture) => dispatch(startAddUserNavigationEvent(navigationEventCapture))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisteredCoursesListFilters);
