import uuid from 'uuid';
import database from '../firebase/firebase';

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
              console.log(`localUserId: ${localUserId.id}`);
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
