import uuid from 'uuid';
import database from '../firebase/firebase';

// APPROVE_REGISTRATION
export const approveRegistrationForUser_Course = (id, updates) => ({
    type: 'APPROVE_REGISTRATION',
    id,
    updates
  });
  
  export const startApproveRegistrationForUser_Course = (registrationUserPairing = {}) => {
  
    return (dispatch, getState) => {
      const {
        registration_userid = ``,
        registration_id = ``
      } = registrationUserPairing;
  
      const updates = { registration_status: 'approved' };
  
      return database.ref(`users_tables/${registration_userid}/registration/${registration_id}`).update(updates).then(() => {
        dispatch(approveRegistrationForUser_Course(registration_id, updates));
      });
    };
  }
  
// SET_ALL_REGISTRATIONS
export const setAllRegistrations = (registrations_all) => ({
    type: 'SET_ALL_REGISTRATIONS',
    registrations_all
});


export const startsetAllRegistrations = () => {
    return (dispatch, getState) => {
      const registrations_all = [];

      return database.ref('users_tables').once('value').then((snapshot) => {
          const user_ids = [];

          snapshot.forEach((childSnapshot) => {
              user_ids.push({
                  id: childSnapshot.key
              })
          })

          user_ids.map((localUserId) => {
              return database.ref(`users_tables/${localUserId.id}/registration`).once('value').then((snapshot) => {
            
                  snapshot.forEach((childSnapshot) => {
                      registrations_all.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                      });
                  });
              });
          })
          dispatch(setAllRegistrations(registrations_all));
      });
  };
};
