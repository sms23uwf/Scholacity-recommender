import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { PersistentDrawerLeft } from './PersistentDrawerLeft';
import { startAddUserNavigationEvent } from '../actions/navigationEvents';
import routes from '../routers/SidebarRouter';
import altRoutes from '../routers/SidebarRouterAlt';
import { firebase } from '../firebase/firebase';

const handleStartLogout = (props) => {
  props.startAddUserNavigationEvent({timestamp: Date.now(), event: 'logout'});
  props.startLogout();
}

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userRoutes: []
    }
  }

  componentDidMount() {
    let userDomainArray = firebase.auth().currentUser.email.split('@');
    const userDomain = userDomainArray[1];
    
    const sessionRoutes = userDomain == 'scholarsanonymous.org' ? altRoutes : routes;

    this.setState({
      userRoutes: sessionRoutes
    });
  };

  handleCancel = () => {
    this.recordNavigationEvent('logout');
    this.props.startLogout();
  }

  recordNavigationEvent = (event) => {
    let timeStamp = Date.now();

    const navigationEventCapture = {timestamp: timeStamp, event: event};
    this.props.startAddUserNavigationEvent(navigationEventCapture);
  }

  render() {
    return (
      <header className="header">
      <div className="content-container">
        <div>
          <PersistentDrawerLeft handleLogout={this.handleCancel} routes={this.state.userRoutes} />
        </div>
      </div>
    </header>
    )
  };

}
const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  startAddUserNavigationEvent: (navigationEventCapture) => dispatch(startAddUserNavigationEvent(navigationEventCapture))  
});

export default connect(undefined, mapDispatchToProps)(Header);