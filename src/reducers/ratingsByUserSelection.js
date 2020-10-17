
const ratingsByUserSelectReducerDefaultState = [];

export default (state = ratingsByUserSelectReducerDefaultState, action) => {

  switch (action.type) {
    case 'ADD_USER_SELECTION_RATING':
      return [
        ...state,
        action.ratings_user_selection
      ];
    case 'SET_USER_SELECTION_RATING':
      return action.ratings_user_selection;
    default:
      return state;
  }
};