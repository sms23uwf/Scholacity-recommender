import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import { history } from '../routers/AppRouter';

export const LoginPage = ({ startLogin }) => (
  <div>
    <div className="box-layout">
      <span id="image">
        <div className="box-layout__box">
          <h1 className="box-layout__title">Scholacity</h1>
          <p>Course Recommender System for Lifelong Leisure Learning.</p>
          <button className="button" onClick={startLogin}>Login with Google</button>
        </div>
      </span>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
