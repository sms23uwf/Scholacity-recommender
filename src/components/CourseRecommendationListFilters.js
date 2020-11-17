import React from 'react';
import { connect } from 'react-redux';
import { startAddUserNavigationEvent } from '../actions/navigationEvents';

export class CourseRecommendationListFilters extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.recordNavigationEvent('RecommendationsDashboard');
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
  startAddUserNavigationEvent: (navigationEventCapture) => dispatch(startAddUserNavigationEvent(navigationEventCapture))
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseRecommendationListFilters);
