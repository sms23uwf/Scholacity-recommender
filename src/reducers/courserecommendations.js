// Course Recommendations Reducer

const courserecommendationsReducerDefaultState = [];

export default (state = courserecommendationsReducerDefaultState, action) => {

  switch (action.type) {
    case 'ADD_COURSE_RECOMMENDATION':
      return [
        ...state,
        action.courserecommendations
      ];
    case 'REMOVE_COURSE_RECOMMENDATION':
      return state.filter(({ id }) => id !== action.id);
    case 'SET_COURSE_RECOMMENDATIONS':
      return action.courserecommendations;
    case 'EDIT_COURSE_RECOMMENDATION':
      return state.map((courserecommendation) => {
        if (courserecommendation.id === action.id) {
          return {
            ...courserecommendation,
            ...action.updates
          };
        } else {
          return courserecommendation;
        };
      });
    default:
      return state;
  }
};