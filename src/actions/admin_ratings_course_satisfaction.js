import uuid from 'uuid';
import database from '../firebase/firebase';


// SET_ALL_COURSE_SATISFACTION_RATINGS
export const setAllCourseSatisfactionRatings = (course_satisfaction_ratings_all) => ({
    type: 'SET_ALL_COURSE_SATISFACTION_RATINGS',
    course_satisfaction_ratings_all
});


export const startsetAllCourseSatisfactionRatings = () => {
    return (dispatch, getState) => {
      const course_satisfaction_ratings_all = [];

      return database.ref('users_tables').once('value').then((snapshot) => {
          const user_ids = [];

          snapshot.forEach((childSnapshot) => {
              user_ids.push({
                  id: childSnapshot.key
              })
          })

          user_ids.map((localUserId) => {
              return database.ref(`users_tables/${localUserId.id}/ratings_by_user_course`).once('value').then((snapshot) => {
            
                  snapshot.forEach((childSnapshot) => {
                    course_satisfaction_ratings_all.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                      });
                  });
              });
          })
          dispatch(setAllCourseSatisfactionRatings(course_satisfaction_ratings_all));
      });
  };
};
