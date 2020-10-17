// Course Recommendations Reducer

const courses_dowReducerDefaultState = [];

export default (state = courses_dowReducerDefaultState, action) => {

  switch (action.type) {
    case 'SET_COURSES_BY_DOW':
      return action.courses_by_dow;
    default:
      return state;
  }
};