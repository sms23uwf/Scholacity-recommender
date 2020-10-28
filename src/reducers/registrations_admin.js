
const registrationsAllSelectReducerDefaultState = [];

export default (state = registrationsAllSelectReducerDefaultState, action) => {

  switch (action.type) {
    case 'APPROVE_REGISTRATION':
      return state.map((registration) => {
        if (registration.id === action.id) {
          return {
            ...registration,
            ...action.updates
          };
        } else {
          return registration;
        };
      });
  
    case 'SET_ALL_REGISTRATIONS':
        return action.registrations_all;
    default:
      return state;
  }
};