import uuid from 'uuid';
import database from '../firebase/firebase';
import { firebase } from '../firebase/firebase';

// ADD_USER_NAVIGATION_EVENT
export const addUserNavigationEvent = (user_navigation_event) => ({
    type: 'ADD_USER_NAVIGATION_EVENT',
    user_navigation_event
  });
  
 export const startAddUserNavigationEvent = (eventData = {}) => {
    return (dispatch, getState) => {
        //const uid = getState().auth.uid;
        const uid = firebase.auth().currentUser.uid;
        const {
            timestamp = ``,
            userid = uid,
            event = ``
        } = eventData;
        if (timestamp === '')
        {
          timestamp = Date.now();
        }

        const navigationEventData = { timestamp, userid, event };
        return database.ref(`users_tables/${uid}/navigation_event`).push({...navigationEventData}).then((ref) => {
        dispatch(addUserNavigationEvent({
            id: ref.key,
            ...navigationEventData
        }));
      });
    };
 };

// SET_USER_NAVIGATION_EVENT
export const setUserNavigationEvent = (user_navigation_events) => ({
  type: 'SET_USER_NAVIGATION_EVENT',
  user_navigation_events
});

export const startSetUserNavigationEvent = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`users_tables/${uid}/navigation_event`).once('value').then((snapshot) => {
      const navigationEventData = [];

      snapshot.forEach((childSnapshot) => {
        navigationEventData.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
      });

      dispatch(setUserNavigationEvent(navigationEventData));
    });
  };
};