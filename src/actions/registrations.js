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
      course_description = ``,
      rating = 0,
      course_instructor = ``,
      course_fee = ``, 
      userid = ``,
      user_email = ``,
      registration_status = ``
    } = registrationData;

    const registrationUserPairing = { courseid, course_name, course_description, rating, course_instructor, course_fee, userid, user_email, registration_status};

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
  
export const startRemoveRegistrationFromUser = (id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`users_tables/${uid}/registration/${id}`).remove().then(() => {
      dispatch(removeRegistrationFromUser({ id }));
    });
  };
};
 
// EDIT_COURSE_REGISTRATION
export const editCourseRegistration = (id, updates) => ({
  type: 'EDIT_COURSE_REGISTRATION',
  id,
  updates
});

export const startEditCourseRegistration = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users_tables/${uid}/registration/${id}`).update(updates).then(() => {
      dispatch(editCourseRegistration(id, updates));
      dispatch(startsetRegistrationsByUser());
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

