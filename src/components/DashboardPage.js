import React from 'react';
import InformedConsentModal from './InformedConsentModal';
import Checkbox from './Checkbox';
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

var userMustAgree = false;

const section = {
  height: "100%",
  paddingTop: 1
};

export class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  state = {
   showModal: userMustAgree,
   agreeChecked: false,
   userid: firebase.auth().currentUser.uid
  }

  componentDidMount() {
    this.recordNavigationEvent('Dashboard');
  }

  closeModal = () => {
    userMustAgree = false
    this.setState({
      showModal: !this.state.showModal
    });
  }

  handleCancel = () => {
    this.recordNavigationEvent('logout');
    this.closeModal()
    {cancelLogin()}
    history.push('/cancel');
  }

  recordNavigationEvent = (event) => {
    let timeStamp = Date.now();

    const navigationEventCapture = {timestamp: timeStamp, event: event};
    this.props.startAddUserNavigationEvent(navigationEventCapture);
  }

  toggleModal = () => {
    if (this.state.agreeChecked)
    {
      this.props.startAddUser();
      userMustAgree = false
      this.setState({
        showModal: !this.state.showModal
      });
    }
  }

  onCheckChange = (e) => {
    this.setState({
      agreeChecked: !this.state.agreeChecked
    });
  };

  render() {
    return (
        <div className="content-container-dashboard">
          <span id="image">
            <span id="image-inner" />
          </span>
          <InformedConsentModal
          show={userMustAgree}
          closeCallback={this.toggleModal}
          handleLogout={this.handleCancel}
          customClass="custom_modal_class"
          >
            <React.Fragment>
            <br/>
            <h2>Informed Consent</h2>
            <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }} gutterBottom>
              Removing a Potential Barrier to Lifelong Learning by Reducing Extrinsic Cognitive Load in the Course Selection Process: A Feasibility Study
            </Typography>

            
            <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semibold`, color: `#000000`, textAlign: `left` }} gutterBottom>
                Thank you for your interest in this research project. Federal and university regulations require us to obtain signed consent for participation in research involving human participants. After reading the statements below, please indicate your consent by checking the box and clicking the 'Accept' button.
            </Typography>
            <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `semibold`, color: `#000000`, textAlign: `left` }} gutterBottom>
                The purpose of this study is to investigate the useability and acceptability of selecting desired Learning Outcomes that will result in a Course recommendation.
                I understand that:
            </Typography>
            <ul>
              <li style={{ fontSize: '1.25em', fontWeight: `semibold`, color: `#000000`, textAlign: `left` }}>There are no physical risks associated with this study.</li>
              <li style={{ fontSize: '1.25em', fontWeight: `semibold`, color: `#000000`, textAlign: `left` }}>The Web Application will collect no information whatsoever about the participant.</li>
              <li style={{ fontSize: '1.25em', fontWeight: `semibold`, color: `#000000`, textAlign: `left` }}>I may discontinue participation in this study at any time.</li>
            </ul>
        
              <div className="list-item__consent">
                <Checkbox style={section} type="checkbox" label="I have read and understand the statements above and agree to participate in the project." onCheckboxChange={this.onCheckChange}/>
              </div>

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
  startLogin: () => dispatch(startLogin()),
  startAddUser: () => dispatch(startAddUser()),
  setUUIDFilter: (userId) => dispatch(setUUIDFilter(userId)),
  startAddUserNavigationEvent: (navigationEventCapture) => dispatch(startAddUserNavigationEvent(navigationEventCapture))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);