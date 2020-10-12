import React from 'react';
import InformedConsentModal from './InformedConsentModal';
import Checkbox from './Checkbox';
import { startLogout } from '../actions/auth';
import { cancelLogin } from '../actions/auth';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
import selectUsers from '../selectors/users';
import { startAddUser } from '../actions/users';
import { startAddUserNavigationEvent } from '../actions/navigationEvents';
import { firebase } from '../firebase/firebase';
import { setUUIDFilter } from '../actions/filters';
import Typography from "@material-ui/core/Typography";

// require('bootstrap/dist/css/bootstrap.css');

var invalidUserDomain = false;

const section = {
  height: "100%",
  paddingTop: 1
};

export class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  state = {
   showModal: false,
   userid: firebase.auth().currentUser.uid
  }

  componentDidMount() {
    this.recordNavigationEvent('Dashboard');

    let userDomainArray = firebase.auth().currentUser.email.split('@');
    const userDomain = userDomainArray[1];

    //TODO: change this last one to 'uwf.edu'
    if ((userDomain != 'scholacity.org') && (userDomain != 'scholarsanonymous.org') && (userDomain != 'students.uwf.edu')) {
      console.log('logged out due to unauthorized domain');
      this.setState({
        invalidUserDomain: true,
        showModal: true
      })
    }

  }

  closeModal = () => {
    invalidUserDomain = false
    this.setState({
      showModal: false
    });
  }

  handleCancel = () => {
    console.log('inside handleCancel')
    this.closeModal()
    {cancelLogin()}
    history.push('/cancel');
  }

  recordNavigationEvent = (event) => {
    let timeStamp = Date.now();

    const navigationEventCapture = {timestamp: timeStamp, event: event};
    this.props.startAddUserNavigationEvent(navigationEventCapture);
  }

  render() {
    return (
        <div className="content-container-dashboard">
          <span id="image">
            <span id="image-inner" />
          </span>
          <InformedConsentModal
            show={this.state.showModal}
            closeCallback={this.handleCancel}
            customClass="custom_modal_class"
          >
            <React.Fragment>
              <br/>
              <h2>Please Log In With Your Participant Account</h2>
            </React.Fragment>
          </InformedConsentModal>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    users: selectUsers(state.users, firebase.auth().currentUser.uid),
    filters: state.filters
  };
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  startLogin: () => dispatch(startLogin()),
  startAddUser: () => dispatch(startAddUser()),
  setUUIDFilter: (userId) => dispatch(setUUIDFilter(userId)),
  startAddUserNavigationEvent: (navigationEventCapture) => dispatch(startAddUserNavigationEvent(navigationEventCapture))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);