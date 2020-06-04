import uuid from 'uuid';
import database from '../firebase/firebase';


// SELECT_LEARNING_OBJECTIVES
export const selectLearningObjectives = (learningobjectives) => ({
  type: 'SELECT_LEARNING_OBJECTIVES',
  learningobjectives
});

export const startSelectLearningObjectives = (knowledgearea) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`learningobjective/${knowledgearea}`).once('value').then((snapshot) => {
        const learningobjectives = [];

      snapshot.forEach((childSnapshot) => {
        learningobjectives.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(selectLearningObjectives(learningobjectives));
    });
  };
};

// SET_LEARNING_OBJECTIVES
export const setLearningObjectives = (learningobjectives) => ({
  type: 'SET_LEARNING_OBJECTIVES',
  learningobjectives
});

export const startSetLearningObjectives = () => {
  return (dispatch, getState) => {
    
    return database.ref(`learningobjective`).once('value').then((snapshot) => {
        const learningobjectives = [];

      snapshot.forEach((childSnapshot) => {
        learningobjectives.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setLearningObjectives(learningobjectives));
    });
  };
};