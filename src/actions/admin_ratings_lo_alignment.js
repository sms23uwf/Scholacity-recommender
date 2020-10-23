import uuid from 'uuid';
import database from '../firebase/firebase';

// SET_ALL_LO_ALIGNMENT_RATINGS
export const setAllLOAlignmentRatings = (lo_alignment_ratings_all) => ({
    type: 'SET_ALL_LO_ALIGNMENT_RATINGS',
    lo_alignment_ratings_all
});


export const startsetAllLOAlignmentRatings = () => {
    return (dispatch, getState) => {
      const lo_alignment_ratings_all = [];

      return database.ref('users_tables').once('value').then((snapshot) => {
          const user_ids = [];

          snapshot.forEach((childSnapshot) => {
              user_ids.push({
                  id: childSnapshot.key
              })
          })

          user_ids.map((localUserId) => {
              return database.ref(`users_tables/${localUserId.id}/ratings_by_user_course_lo`).once('value').then((snapshot) => {
            
                  snapshot.forEach((childSnapshot) => {
                    lo_alignment_ratings_all.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                      });
                  });
              });
          })
          dispatch(setAllLOAlignmentRatings(lo_alignment_ratings_all));
      });
  };
};

