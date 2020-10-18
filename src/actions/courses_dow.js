import { LocalDrinkTwoTone } from '@material-ui/icons';
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
    
          dispatch(setCoursesByDOW(courses_by_dow));
        });
    };
};

export const startsetCoursesByDOW_EXP = () => {
  return (dispatch, getState) => {
    const courses_by_dow = [];

    console.log(`inside startsetCoursesByDOW`);

    return database.ref('courses_dow').once('value').then((snapshot) => {
        const courses_dow = [];

        snapshot.forEach((childSnapshot) => {
            courses_dow.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            })
        })

        courses_dow.map((course_dow) => {
            console.log(`inside loop of courses_by_dow with course_dow: ${course_dow.courseid} and ${course_dow.DOW}`);

            return database.ref(`courses/${course_dow.courseid}`).once('value').then((snapshot) => {
          
                console.log(`1inside loop of all courses with id: ${course_dow.courseid}`);

                snapshot.forEach((childSnapshot) => {
                    
                    courses_by_dow.push({
                      id: childSnapshot.key,
                      dow: course_dow.DOW,
                      catalogid: childSnapshot.catalogid,
                      description: childSnapshot.description,
                      fee: childSnapshot.fee,
                      instructor: childSnapshot.instructor,
                      knowledgeareaid: childSnapshot.knowledgeareaid,
                      name: childSnapshot.name
                    });
                });
            });
        })
        dispatch(setCoursesByDOW(courses_by_dow));
    });
  };
};


