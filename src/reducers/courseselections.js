// Course Recommendations Reducer

const courseselectionsReducerDefaultState = [];

export default (state = courseselectionsReducerDefaultState, action) => {

  switch (action.type) {
    case 'ADD_COURSE_SELECTION':
      return [
        ...state,
        action.courseselections
      ];
    case 'REMOVE_COURSE_SELECTION':
      return state.filter(({ id }) => id !== action.id);
    case 'SET_COURSE_SELECTIONS':
      return action.courseselections;
    default:
      return state;
  }
};