import uuid from 'uuid';
import database from '../firebase/firebase';


// ADD_USER_LO_COURSE_RATING
export const addRatingsByUserCourseLO = (ratings_user_course_lo) => ({
    type: 'ADD_USER_LO_COURSE_RATING',
    ratings_user_course_lo
  });
  
 export const startAddRatingsByUserCourseLO = (ratingData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            courseid = ``,
            learningobjectiveid =``,
            userid = ``,
            rating = 0
        } = ratingData;
        const userCourseLORating = { courseid, learningobjectiveid, userid, rating };
    
        return database.ref(`users_tables/${uid}/ratings_by_user_course_lo`).push({...userCourseLORating}).then((ref) => {
        dispatch(addRatingsByUserCourseLO({
            id: ref.key,
            ...userCourseLORating
        }));
      });
    };
 };

// SET_USER_LO_COURSE_RATING
export const setRatingsByUserCourseLO = (ratings_user_course_lo) => ({
  type: 'SET_USER_LO_COURSE_RATING',
  ratings_user_course_lo
});

export const startSetRatingsByUserCourseLO = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`users_tables/${uid}/ratings_by_user_course_lo`).once('value').then((snapshot) => {
      const ratings_user_course_lo = [];

      snapshot.forEach((childSnapshot) => {
        ratings_user_course_lo.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
      });

      dispatch(setRatingsByUserCourseLO(ratings_user_course_lo));
    });
  };
};