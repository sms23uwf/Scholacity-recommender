import uuid from 'uuid';
import database from '../firebase/firebase';
// ADD_RECOMMENDATION_LO_PAIRING
export const addRecommendationLearningObjective = (recommendation_learningobjectives) => ({
    type: 'ADD_RECOMMENDATION_LO_PAIRING',
    recommendation_learningobjectives
  });
  
 export const startAddRecommendationLearningObjective = (loData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            recommendationid = ``,
            learningobjectiveid = ``, 
            userid = ``
        } = loData;
        const recommendationLoUserPairing = { recommendationid, learningobjectiveid, userid };

        return database.ref(`users_tables/${uid}/recommendation_learningobjective`).push({...recommendationLoUserPairing}).then((ref) => {
        dispatch(addRecommendationLearningObjective({
            id: ref.key,
            ...recommendationLoUserPairing
        }));
      });
    };
 };
  
// REMOVE_RECOMMENDATION_LO_PAIRING
export const removeRecommendationLearningObjective = ({ id } = {}) => ({
    type: 'REMOVE_RECOMMENDATION_LO_PAIRING',
    id
  });
  
  export const startRemoveRecommendationLearningObjective = (recommendationLoPairing = {}) => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      const id = recommendationLoPairing.id;
  
      return database.ref(`users_tables/${uid}/recommendation_learningobjective/${id}`).remove().then(() => {
        dispatch(removeRecommendationLearningObjective({ id }));
      });
    };
  };
  

// SET_RECOMMENDATION_LO_PAIRINGS
export const setRecommendationLearningObjectives = (recommendation_learningobjectives) => ({
  type: 'SET_RECOMMENDATION_LO_PAIRINGS',
  recommendation_learningobjectives
});

export const startSetRecommendationLearningObjectives = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    
    return database.ref(`users_tables/${uid}/recommendation_learningobjective`).once('value').then((snapshot) => {
      const recommendation_learningobjectives = [];

      snapshot.forEach((childSnapshot) => {
        recommendation_learningobjectives.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
      });

      dispatch(setRecommendationLearningObjectives(recommendation_learningobjectives));
    });
  };
};