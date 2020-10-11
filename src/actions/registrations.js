import uuid from 'uuid';
import database from '../firebase/firebase';

export const addRegistrationToUser = (registrationUserPairing) => ({
  type: 'ADD_REGISTRATION_USER',
  registrationUserPairing
});

export const startAddRegistrationToUser = (registrationData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      courseid = ``,
      course_name = ``,
      course_instructor = ``,
      course_fee = ``, 
      userid = ``,
      user_email = ``,
      registration_status = ``
    } = registrationData;
    console.log(`You are in startAddRegistrationToUser with course_name: ${course_name}.`);

    const registrationUserPairing = { courseid, course_name, course_instructor, course_fee, userid, user_email, registration_status};

    return database.ref(`users_tables/${uid}/registration`).push({...registrationUserPairing}).then((ref) => {
      dispatch(addRegistrationToUser({
        id: ref.key,
        ...registrationUserPairing
      }));
    });
  };
};

// REMOVE_REGISTRATION_USER
export const removeRegistrationFromUser = ({ id } = {}) => ({
    type: 'REMOVE_REGISTRATION_USER',
    id
  });
  
  export const startRemoveRegistrationFromUser = (registrationPairing = {}) => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      const id = registrationPairing.id;
  
      return database.ref(`users_tables/${uid}/registration/${id}`).remove().then(() => {
        dispatch(removeRegistrationFromUser({ id }));
      });
    };
  };
  
  // SET_REGISTRATION_USER
export const setRegistrationsByUser = (registrations_user) => ({
    type: 'SET_REGISTRATION_USER',
    registrations_user
  });
  
  export const startsetRegistrationsByUser = () => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
  
      return database.ref(`users_tables/${uid}/registration`).once('value').then((snapshot) => {
        const registrations_user = [];
  
        snapshot.forEach((childSnapshot) => {
            registrations_user.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
        });
  
        dispatch(setRegistrationsByUser(registrations_user));
      });
    };
  };

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
                return database.ref(`users_tables/${uid}/registration`).once('value').then((snapshot) => {
              
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
