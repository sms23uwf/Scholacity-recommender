
const coursesUserSelectReducerDefaultState = [];

export default (state = coursesUserSelectReducerDefaultState, action) => {

  switch (action.type) {
    case 'ADD_COURSE_USER_PAIRING':
      return [
        ...state,
        action.course_userselects
      ];
    case 'REMOVE_COURSE_USER_PAIRING':
      return state.filter(({ id }) => id !== action.id);
    case 'SET_COURSE_USER_PAIRINGS':
      return action.course_userselects;
    default:
      return state;
  }
};