import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import { history } from '../routers/AppRouter';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { firebase } from '../firebase/firebase';
import 'firebaseui/dist/firebaseui.css';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

export const LoginPage = ({ startLogin }) => (
  <div>
    <div className="box-layout">
      <span id="image">
        <div className="content-container">
          <h1 className="title">Scholacity</h1>
          <h2>Course Selection System for Lifelong Learning.</h2>
          <br/>
          <h3>Click the Button to Sign In With Your Participant Account</h3>
          <br/>
          <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      </span>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
