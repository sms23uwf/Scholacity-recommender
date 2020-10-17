import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetCourseRecommendations } from './actions/courseRecommendations';
import { startSetCourseSelections } from './actions/courseSelections';
import { startSetCourses } from './actions/courses';
import { startSetSessions } from './actions/sessions';
import { startsetCoursesByDOW } from './actions/courses_dow';
import { startSetLearningObjectives } from './actions/learningObjectives';
import { startSetKnowledgeAreas } from './actions/knowledgeAreas';
import { startsetLOSelectionsByUser } from './actions/learningobjective_userselect';
import { startsetRegistrationsByUser } from './actions/registrations';
import { startsetAllRegistrations } from './actions/registrations_admin';
import { startsetCourseSelectionsByUser } from './actions/course_userselect';
import { startSetLOCourses } from './actions/learningobjective_course';
import { startSetRecommendationLearningObjectives } from './actions/recommendation_learningobjective';
import { login, logout } from './actions/auth';
import { startSetUsers } from './actions/users';
import getVisibleCourseRecommendations from './selectors/courserecommendations';
import getVisibleLearningObjectives from './selectors/learningobjectives';
import getVisibleKnowledgeAreas from './selectors/knowledgeareas';
import InformedConsentModal from './components/InformedConsentModal';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import { setUUIDFilter, setDomainFilter } from './actions/filters';
import { startSetRatingsByUserCourseLO } from './actions/ratingsByUserCourseLO';
import getVisibleRatingsByUserCourseLO from './selectors/ratingsByUserCourseLO';
import { startAddUserNavigationEvent } from './actions/navigationEvents';
import { connect } from 'react-redux';

require ('../public/images/favicon.ico');

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (firebase.auth().currentUser) {
    store.dispatch(setUUIDFilter(firebase.auth().currentUser.uid));
  }
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
    document.documentElement.requestFullscreen;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));
firebase.auth().onIdTokenChanged(() => {
  if (firebase.auth().currentUser) {
    store.dispatch(setUUIDFilter(firebase.auth().currentUser.uid));
  }
  if (history.location.pathname === '/cancel') {
    history.push('/');
  }
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(`log in`);

    store.dispatch(setUUIDFilter(firebase.auth().currentUser.uid));
    store.dispatch(startAddUserNavigationEvent({timestamp: Date.now(), event: 'login'}));

    store.dispatch(login(user.uid));
    store.dispatch(startSetCourses());
    store.dispatch(startsetCoursesByDOW());
    store.dispatch(startSetSessions());
    store.dispatch(startSetCourseRecommendations());
    store.dispatch(startSetCourseSelections());
    store.dispatch(startSetRecommendationLearningObjectives());
    store.dispatch(startSetLearningObjectives());
    store.dispatch(startSetUsers());
    store.dispatch(startsetLOSelectionsByUser());
    store.dispatch(startsetRegistrationsByUser());
    store.dispatch(startsetAllRegistrations());
    store.dispatch(startsetCourseSelectionsByUser());
    store.dispatch(startSetLOCourses());
    store.dispatch(startSetRatingsByUserCourseLO());
    store.dispatch(startSetKnowledgeAreas()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
      
    });
  } else {
    console.log(`log out`);

    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});