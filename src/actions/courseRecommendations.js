import uuid from 'uuid';
import database from '../firebase/firebase';

export const addCourseRecommendation = (courserecommendations) => ({
  type: 'ADD_COURSE_RECOMMENDATION',
  courserecommendations
});

export const startAddCourseRecommendation = (courseRecommendationData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      userid = ``,
      courseid = ``,
      learningobjectiveid = ``,
      learningobjectives = {}, 
      rating = 0,
      counter = ``,
      disposition = ``,
      knowledgearea = ``,
      existingrecommendationid = ``,
      coursename = ``,
      coursedescription = ``,
      instructor = ``,
      fee = ``
    } = courseRecommendationData;


    const courseUserPairing = { userid, courseid, learningobjectiveid, learningobjectives, rating, counter, disposition, knowledgearea, existingrecommendationid, coursename, coursedescription, instructor, fee };

    if(existingrecommendationid === ``)
    {
      return database.ref(`users_tables/${uid}/courserecommendation`).push({...courseUserPairing}).then((ref) => {
        database.ref(`users_tables/${uid}/courserecommendation/${ref.key}`).child(`learningobjectives`).remove();
        var newLO = database.ref(`users_tables/${uid}/courserecommendation/${ref.key}`).child(`learningobjectives`).push();
        newLO.set({
          learningobjectiveid: learningobjectives[0].learningobjectiveid,
          content: learningobjectives[0].content
          })
 
        dispatch(addCourseRecommendation({
          id: ref.key,
          ...courseUserPairing
        }));
      });
    }
    else
    {
      var newLO = database.ref(`users_tables/${uid}/courserecommendation/${existingrecommendationid}`).child(`learningobjectives`).push();
      newLO.set({
        learningobjectiveid: learningobjectives[0].learningobjectiveid,
        content: learningobjectives[0].content
      })
      dispatch(startSetCourseRecommendations());
    }
  };
};



// REMOVE_COURSE_RECOMMENDATION
export const removeCourseRecommendation = ({ id } = {}) => ({
  type: 'REMOVE_COURSE_RECOMMENDATION',
  id
});


export const startRemoveCourseRecommendation = (recommendationPairing = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const id = recommendationPairing.id;
    return database.ref(`users_tables/${uid}/courserecommendation/${id}`).remove().then(() => {
      dispatch(removeCourseRecommendation({ id }));
    });
  };
};

// ADD_RECOMMENDATION_LO
export const addRecommendationLO = (id) => ({
  type: 'ADD_RECOMMENDATION_LO',
  id
});

// REMOVE_COURSE_SELECTED_LO
export const removeCourseSelectedLO = (recommendation_id, id) => ({
  type: 'REMOVE_COURSE_SELECTED_LO',
  recommendation_id,
  id
});

export const startRemoveCourseSelectedLO = (recommendationLOPairing = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const recommendation_id = recommendationLOPairing.recommendation_id;
    const id = recommendationLOPairing.id;
    return database.ref(`users_tables/${uid}/courserecommendation/${recommendation_id}`).child(`learningobjectives/${id}`).remove().then(() => {
      dispatch(removeCourseSelectedLO(recommendation_id, id));
    });
  };
};


// EDIT_COURSE_RECOMMENDATION
export const editCourseRecommendation = (id, updates) => ({
  type: 'EDIT_COURSE_RECOMMENDATION',
  id,
  updates
});

export const startEditCourseRecommendation = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users_tables/${uid}/courserecommendation/${id}`).update(updates).then(() => {
      dispatch(editCourseRecommendation(id, updates));
    });
  };
};

// SET_COURSE_RECOMMENDATIONS
export const setCourseRecommendations = (courserecommendations) => ({
  type: 'SET_COURSE_RECOMMENDATIONS',
  courserecommendations
});

export const startSetCourseRecommendations = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users_tables/${uid}/courserecommendation`).once('value').then((snapshot) => {
        const courserecommendations = [];

      snapshot.forEach((childSnapshot) => {
        courserecommendations.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setCourseRecommendations(courserecommendations));
    });
  };
};
