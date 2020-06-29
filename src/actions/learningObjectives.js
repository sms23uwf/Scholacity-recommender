import uuid from 'uuid';
import database from '../firebase/firebase';

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