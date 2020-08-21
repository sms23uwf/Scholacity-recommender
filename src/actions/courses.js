import uuid from 'uuid';
import database from '../firebase/firebase';


// SET_COURSES
export const setCourses = (courses) => ({
  type: 'SET_COURSES',
  courses
});

export const startSetCourses = () => {
  return (dispatch, getState) => {
    
    return database.ref(`course`).once('value').then((snapshot) => {
        const courses = [];

      snapshot.forEach((childSnapshot) => {
        courses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setCourses(courses));
    });
  };
};