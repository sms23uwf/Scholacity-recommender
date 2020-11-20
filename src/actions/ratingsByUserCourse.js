import uuid from 'uuid';
import database from '../firebase/firebase';


// ADD_USER_COURSE_RATING
export const addRatingsByUserCourse = (ratings_user_course) => ({
    type: 'ADD_USER_COURSE_RATING',
    ratings_user_course
  });
  
 export const startAddRatingsByUserCourse = (ratingData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            courseid = ``,
            userid = ``,
            rating = 0
        } = ratingData;
        const userCourseRating = { courseid, userid, rating };
    
        return database.ref(`users_tables/${uid}/ratings_by_user_course`).push({...userCourseRating}).then((ref) => {
        dispatch(addRatingsByUserCourse({
            id: ref.key,
            ...userCourseRating
        }));
      });
    };
 };

// SET_USER_COURSE_RATING
export const setRatingsByUserCourse = (ratings_user_course) => ({
  type: 'SET_USER_COURSE_RATING',
  ratings_user_course
});

export const startSetRatingsByUserCourse = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`users_tables/${uid}/ratings_by_user_course`).once('value').then((snapshot) => {
      const ratings_user_course = [];

      snapshot.forEach((childSnapshot) => {
        ratings_user_course.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
      });

      dispatch(setRatingsByUserCourse(ratings_user_course));
    });
  };
};
