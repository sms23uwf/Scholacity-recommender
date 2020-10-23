
const admin_ratings_course_satisfactionReducerDefaultState = [];

export default (state = admin_ratings_course_satisfactionReducerDefaultState, action) => {

  switch (action.type) {
    case 'SET_ALL_COURSE_SATISFACTION_RATINGS':
      return action.course_satisfaction_ratings_all;
    default:
      return state;
  }
};