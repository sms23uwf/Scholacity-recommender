import uuid from 'uuid';
import database from '../firebase/firebase';

// SET_LO_COURSE_PAIRINGS
export const setLOCourses = (learningobjective_courses) => ({
  type: 'SET_LO_COURSE_PAIRINGS',
  learningobjective_courses
});

export const startSetLOCourses = () => {
  return (dispatch) => {
    
    return database.ref(`learningobjective_course`).once('value').then((snapshot) => {
      const learningobjective_courses = [];

      snapshot.forEach((childSnapshot) => {
        learningobjective_courses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
      });

      dispatch(setLOCourses(learningobjective_courses));
    });
  };
};