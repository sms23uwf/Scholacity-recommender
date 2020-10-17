import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import courseRecommendationsReducer from '../reducers/courserecommendations';
import courseSelectionsReducer from '../reducers/courseselections';
import coursesReducer from '../reducers/courses';
import sessionsReducer from '../reducers/sessions';
import coursesByDOWReducer from '../reducers/courses_dow';
import learningObjectivesReducer from '../reducers/learningobjectives';
import coursesUserSelectsReducer from '../reducers/course_userselect';
import registrationsUserReducer from '../reducers/registrations';
import registrationsAllReducer from '../reducers/registrations_admin';
import learningObjectivesUserSelectReducer from '../reducers/learningobjective_userselect';
import learningObjectiveCourseReducer from '../reducers/learningobjective_course';
import knowledgeAreasReducer from '../reducers/knowledgeareas.js';
import recommendationLearningObjectiveReducer from '../reducers/recommendation_learningobjective';
import usersReducer from '../reducers/users.js';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import ratingsReducer from '../reducers/ratingsByUserCourseLO';
import navigationEventsReducer from '../reducers/navigationEvents';
import selectionEventsReducer from '../reducers/selectionEvents';
import timeInModalReducer from '../reducers/timeInModal';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      courserecommendations: courseRecommendationsReducer,
      courseselections: courseSelectionsReducer,
      courses: coursesReducer,
      courses_by_dow: coursesByDOWReducer,
      sessions: sessionsReducer,
      learningobjectives: learningObjectivesReducer,
      course_userselects: coursesUserSelectsReducer,
      learningobjective_userselects: learningObjectivesUserSelectReducer,
      registrations_user: registrationsUserReducer,
      registrations_all: registrationsAllReducer,
      knowledgeareas: knowledgeAreasReducer,
      learningobjective_courses: learningObjectiveCourseReducer,
      recommendation_learningobjectives: recommendationLearningObjectiveReducer,
      users: usersReducer,
      filters: filtersReducer,
      auth: authReducer,
      ratings_user_course_lo: ratingsReducer,
      user_navigation_events: navigationEventsReducer,
      user_selection_events: selectionEventsReducer,
      user_times_in_modals: timeInModalReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};