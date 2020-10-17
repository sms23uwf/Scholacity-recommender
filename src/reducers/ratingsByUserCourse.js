
const ratingsByUserCourseSelectReducerDefaultState = [];

export default (state = ratingsByUserCourseSelectReducerDefaultState, action) => {

  switch (action.type) {
    case 'ADD_USER_COURSE_RATING':
      return [
        ...state,
        action.ratings_user_course
      ];
    case 'SET_USER_COURSE_RATING':
      return action.ratings_user_course;
    default:
      return state;
  }
};