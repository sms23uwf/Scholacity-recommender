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
    case 'EDIT_COURSE_SELECTION':
      return state.map((courseselection) => {
        if (courseselection.id === action.id) {
          return {
            ...courseselection,
            ...action.updates
          };
        } else {
          return courseselection;
        };
      });
    default:
      return state;
  }
};