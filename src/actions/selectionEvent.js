import uuid from 'uuid';
import database from '../firebase/firebase';


// ADD_USER_TIME_IN_MODAL
export const addUserSelectionEvent = (user_selection_event) => ({
    type: 'ADD_USER_SELECTION_EVENT',
    user_selection_event
  });
  
 export const startAddUserSelectionEvent = (timeData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            timestamp = ``,
            userid = uid,
            learningobjectiveid = ``,
            disposition = ``
        } = timeData;
        const selectionEventData = { timestamp, userid, learningobjectiveid, disposition };
    
        return database.ref(`users_tables/${uid}/selection_event`).push({...selectionEventData}).then((ref) => {
        dispatch(addUserSelectionEvent({
            id: ref.key,
            ...selectionEventData
        }));
      });
    };
 };

// SET_USER_TIME_IN_MODAL
export const setUserSelectionEvent = (user_selection_events) => ({
  type: 'SET_USER_SELECTION_EVENT',
  user_selection_events
});

export const startSetUserSelectionEvent = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`users_tables/${uid}/selection_event`).once('value').then((snapshot) => {
      const selectionEventData = [];

      snapshot.forEach((childSnapshot) => {
        selectionEventData.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
      });

      dispatch(setUserSelectionEvent(selectionEventData));
    });
  };
};