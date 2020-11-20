import uuid from 'uuid';
import database from '../firebase/firebase';

export const addCourseSelection = (courseselections) => ({
  type: 'ADD_COURSE_SELECTION',
  courseselections
});

export const startAddCourseSelection = (courseSelectionData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      userid = ``,
      courseid = ``,
      disposition = ``,
      counter = ``,
      rating = 0,
      knowledgearea = ``,
      coursename = ``,
      coursedescription = ``,
      instructor = ``,
      fee = ``
    } = courseSelectionData;

    const courseUserPairing = { userid, courseid, rating, counter, rating, disposition, knowledgearea, coursename, coursedescription, instructor, fee };

    return database.ref(`users_tables/${uid}/courseselection`).push({...courseUserPairing}).then((ref) => {
      dispatch(addCourseSelection({
        id: ref.key,
        ...courseUserPairing
      }));
    });
  };
};

// REMOVE_COURSE_SELECTION
export const removeCourseSelection = ({ id } = {}) => ({
  type: 'REMOVE_COURSE_SELECTION',
  id
});

export const startRemoveCourseSelection = (id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    
    return database.ref(`users_tables/${uid}/courseselection/${id}`).remove().then(() => {
      dispatch(removeCourseSelection({ id }));
    });
  };
};

// EDIT_COURSE_SELECTION
export const editCourseSelection = (id, updates) => ({
  type: 'EDIT_COURSE_SELECTION',
  id,
  updates
});

export const startEditCourseSelection = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users_tables/${uid}/courseselection/${id}`).update(updates).then(() => {
      dispatch(editCourseSelection(id, updates));
    });
  };
};

// SET_COURSE_SELECTIONS
export const setCourseSelections = (courseselections) => ({
  type: 'SET_COURSE_SELECTIONS',
  courseselections
});

export const startSetCourseSelections = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users_tables/${uid}/courseselection`).once('value').then((snapshot) => {
        const courseselections = [];

      snapshot.forEach((childSnapshot) => {
        courseselections.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setCourseSelections(courseselections));
    });
  };
};
