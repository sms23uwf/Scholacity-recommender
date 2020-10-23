import uuid from 'uuid';
import database from '../firebase/firebase';


// SET_ALL_COURSE_OFFERING_RATINGS
export const setAllCourseOfferingRatings = (course_offering_ratings_all) => ({
    type: 'SET_ALL_COURSE_OFFERING_RATINGS',
    course_offering_ratings_all
});


export const startsetAllCourseOfferingRatings = () => {
    return (dispatch, getState) => {
      const course_offering_ratings_all = [];

      return database.ref('users_tables').once('value').then((snapshot) => {
          const user_ids = [];

          snapshot.forEach((childSnapshot) => {
              user_ids.push({
                  id: childSnapshot.key
              })
          })

          user_ids.map((localUserId) => {
              return database.ref(`users_tables/${localUserId.id}/ratings_by_user_selection`).once('value').then((snapshot) => {
            
                  snapshot.forEach((childSnapshot) => {
                    course_offering_ratings_all.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                      });
                  });
              });
          })
          dispatch(setAllCourseOfferingRatings(course_offering_ratings_all));
      });
  };
};

