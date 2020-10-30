
const registrationsUserSelectReducerDefaultState = [];

export default (state = registrationsUserSelectReducerDefaultState, action) => {

  switch (action.type) {
    case 'ADD_REGISTRATION_USER':
      return [
        ...state,
        action.registrationUserPairing
      ];
    case 'REMOVE_REGISTRATION_USER':
      return state.filter(({ id }) => id !== action.id);
    case 'SET_REGISTRATION_USER':
      return action.registrations_user;
    case 'EDIT_COURSE_REGISTRATION':
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
  
    default:
      return state;
  }
};