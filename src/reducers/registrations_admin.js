
const registrationsAllSelectReducerDefaultState = [];

export default (state = registrationsAllSelectReducerDefaultState, action) => {

  switch (action.type) {
    case 'SET_ALL_REGISTRATIONS':
        return action.registrations_all;
    case 'APPROVE_REGISTRATION':
      return action.registrations_all;
    default:
      return state;
  }
};