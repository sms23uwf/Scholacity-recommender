import uuid from 'uuid';
import database from '../firebase/firebase';

export const addCourseSelectionToUser = (course_userselects) => ({
  type: 'ADD_COURSE_USER_PAIRING',
  course_userselects
});

export const startAddCourseSelectionToUser = (courseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      courseid = ``, 
      userid = ``
    } = courseData;
    const courseUserPairing = { courseid, userid };

    return database.ref(`users_tables/${uid}/course_userselect`).push({...courseUserPairing}).then((ref) => {
      dispatch(addCourseSelectionToUser({
        id: ref.key,
        ...courseUserPairing
      }));
    });
  };
};

// REMOVE_LO_USER_PAIRING
export const removeCourseSelectionFromUser = ({ id } = {}) => ({
  type: 'REMOVE_COURSE_USER_PAIRING',
  id
});

export const startRemoveCourseSelectionFromUser = (coursePairing = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const id = coursePairing.id;

    return database.ref(`users_tables/${uid}/course_userselect/${id}`).remove().then(() => {
      dispatch(removeCourseSelectionFromUser({ id }));
    });
  };
};


// SET_LO_USER_PAIRINGS
export const setCourseSelectionsByUser = (course_userselects) => ({
  type: 'SET_COURSE_USER_PAIRINGS',
  course_userselects
});

export const startsetCourseSelectionsByUser = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`users_tables/${uid}/course_userselect`).once('value').then((snapshot) => {
      const course_userselects = [];

      snapshot.forEach((childSnapshot) => {
        course_userselects.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
      });

      dispatch(setCourseSelectionsByUser(course_userselects));
    });
  };
};