// Course Recommendations Reducer

const days_of_weekReducerDefaultState = [];

export default (state = days_of_weekReducerDefaultState, action) => {

  switch (action.type) {
    case 'SET_DAYS_OF_WEEK':
      return action.days_of_week;
    default:
      return state;
  }
};
