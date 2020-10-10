// Course Recommendations Reducer

const sessionsReducerDefaultState = [];

export default (state = sessionsReducerDefaultState, action) => {

  switch (action.type) {
    case 'SET_SESSIONS':
      return action.sessions;
    default:
      return state;
  }
};