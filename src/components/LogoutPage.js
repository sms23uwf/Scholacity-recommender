import React from 'react';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { startAddUserNavigationEvent } from '../actions/navigationEvents';
import { startLogout } from '../actions/auth';
import { history } from '../routers/AppRouter';

class LogoutPage extends Component {
  constructor(props) {
    super(props);
  }

    componentDidMount() {
        this.recordNavigationEvent('logout');
        this.props.startLogout();
        history.push('/loginPage');
    }

    recordNavigationEvent = (event) => {
      let timeStamp = Date.now();
  
      const navigationEventCapture = {timestamp: timeStamp, event: event};
      this.props.startAddUserNavigationEvent(navigationEventCapture);
    }
  
    render() {
        return (
            <div>
            <div className="box-layout">
              <span id="image">
                <div className="box-layout__box">
                  <h1 className="box-layout__title">Scholacity</h1>
                  <p>Goodbye</p>
                </div>
              </span>
            </div>
          </div>
        )
    }
   
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  startAddUserNavigationEvent: (navigationEventCapture) => dispatch(startAddUserNavigationEvent(navigationEventCapture))  
});

export default connect(undefined, mapDispatchToProps)(LogoutPage);
