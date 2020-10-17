import uuid from 'uuid';
import database from '../firebase/firebase';

// SET_COURSES_BY_DOW
export const setCoursesByDOW = (courses_by_dow) => ({
    type: 'SET_COURSES_BY_DOW',
    courses_by_dow
});


export const startsetCoursesByDOW = () => {
    return (dispatch, getState) => {
    
        return database.ref(`courses_dow`).once('value').then((snapshot) => {
            const courses_by_dow = [];
    
          snapshot.forEach((childSnapshot) => {
            courses_by_dow.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });
    
          dispatch(setSessions(courses_by_dow));
        });
    };
};

