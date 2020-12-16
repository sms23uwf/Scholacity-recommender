import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import { history } from '../routers/AppRouter';

export const LoginPage = ({ startLogin }) => (
  <div>
    <div className="box-layout">
      <span id="image">
        <div className="box-layout__box">
          <h2>Course Selection System for Lifelong Learning.</h2>
          <button className="button" onClick={startLogin}>Login With Your Participant Account</button>
        </div>
      </span>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
