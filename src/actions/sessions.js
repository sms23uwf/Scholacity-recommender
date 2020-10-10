import uuid from 'uuid';
import database from '../firebase/firebase';


// SET_SESSIONS
export const setSessions = (sessions) => ({
  type: 'SET_SESSIONS',
  sessions
});

export const startSetSessions = () => {
  return (dispatch, getState) => {
    
    return database.ref(`session`).once('value').then((snapshot) => {
        const sessions = [];

      snapshot.forEach((childSnapshot) => {
        sessions.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setSessions(sessions));
    });
  };
};