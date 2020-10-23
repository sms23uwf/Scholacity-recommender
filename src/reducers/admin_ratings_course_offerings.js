
const admin_ratings_course_offeringsReducerDefaultState = [];

export default (state = admin_ratings_course_offeringsReducerDefaultState, action) => {

  switch (action.type) {
    case 'SET_ALL_COURSE_OFFERING_RATINGS':
      return action.course_offering_ratings_all;
    default:
      return state;
  }
};