import uuid from 'uuid';
import database from '../firebase/firebase';


// ADD_USER_SELECTION_RATING
export const addRatingsByUserSelection = (ratings_user_selection) => ({
    type: 'ADD_USER_SELECTION_RATING',
    ratings_user_selection
  });
  
 export const startAddRatingsByUserSelection = (ratingData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            courseid = ``,
            userid = ``,
            rating = 0
        } = ratingData;
        const userSelectionRating = { courseid, userid, rating };
    
        return database.ref(`users_tables/${uid}/ratings_by_user_selection`).push({...userSelectionRating}).then((ref) => {
        dispatch(addRatingsByUserSelection({
            id: ref.key,
            ...userSelectionRating
        }));
      });
    };
 };

// SET_USER_SELECTION_RATING
export const setRatingsByUserSelection = (ratings_user_selection) => ({
  type: 'SET_USER_SELECTION_RATING',
  ratings_user_selection
});

export const startSetRatingsByUserSelection = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`users_tables/${uid}/ratings_by_user_selection`).once('value').then((snapshot) => {
      const ratings_user_selection = [];

      snapshot.forEach((childSnapshot) => {
        ratings_user_selection.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
      });

      dispatch(setRatingsByUserSelection(ratings_user_selection));
    });
  };
};
