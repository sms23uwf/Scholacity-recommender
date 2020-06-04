import uuid from 'uuid';
import database from '../firebase/firebase';

export const addLOSelectionToUser = (learningobjective_userselects) => ({
  type: 'ADD_LO_USER_PAIRING',
  learningobjective_userselects
});

export const startAddLOSelectionToUser = (loData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      learningobjectiveid = ``, 
      userid = ``
    } = loData;
    const loUserPairing = { learningobjectiveid, userid };

    return database.ref(`users_tables/${uid}/learningobjective_userselect`).push({...loUserPairing}).then((ref) => {
      dispatch(addLOSelectionToUser({
        id: ref.key,
        ...loUserPairing
      }));
    });
  };
};

// REMOVE_LO_USER_PAIRING
export const removeLOSelectionFromUser = ({ id } = {}) => ({
  type: 'REMOVE_LO_USER_PAIRING',
  id
});

export const startRemoveLOSelectionFromUser = (loPairing = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const id = loPairing.id;

    return database.ref(`users_tables/${uid}/learningobjective_userselect/${id}`).remove().then(() => {
      dispatch(removeLOSelectionFromUser({ id }));
    });
  };
};


// SET_LO_USER_PAIRINGS
export const setLOSelectionsByUser = (learningobjective_userselects) => ({
  type: 'SET_LO_USER_PAIRINGS',
  learningobjective_userselects
});

export const startsetLOSelectionsByUser = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`users_tables/${uid}/learningobjective_userselect`).once('value').then((snapshot) => {
      const learningobjective_userselects = [];

      snapshot.forEach((childSnapshot) => {
        learningobjective_userselects.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
      });

      dispatch(setLOSelectionsByUser(learningobjective_userselects));
    });
  };
};