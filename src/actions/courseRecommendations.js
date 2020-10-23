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
      portfolioobjectives = {},
      rating = ``,
      counter = ``,
      disposition = ``,
      knowledgearea = ``,
      existingrecommendationid = ``,
      coursename = ``,
      coursedescription = ``,
      instructor = ``,
      fee = ``
    } = courseRecommendationData;


    const courseUserPairing = { userid, courseid, learningobjectiveid, learningobjectives, portfolioobjectives, rating, counter, disposition, knowledgearea, existingrecommendationid, coursename, coursedescription, instructor, fee };

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
        const recommendationLoPairing = {recommendationid: ref.key, learningobjectiveid: learningobjectiveid, userid: userid };
        //database.ref(`users_tables/${uid}/recommendation_learningobjective`).push(recommendationLoPairing);
      });
    }
    else
    {
      var newLO = database.ref(`users_tables/${uid}/courserecommendation/${existingrecommendationid}`).child(`learningobjectives`).push();
      newLO.set({
        learningobjectiveid: learningobjectives[0].learningobjectiveid,
        content: learningobjectives[0].content
      })

      database.ref(`users_tables/${uid}/courserecommendation/${existingrecommendationid}`).child(`portfolioobjectives`).orderByChild("learningobjectiveid").equalTo(portfolioobjectives[0].learningobjectiveid).once("value",snapshot => {
        const poData = snapshot.val();

        if(poData) {
          // nothing to do
        } else {
          var newPO = database.ref(`users_tables/${uid}/courserecommendation/${existingrecommendationid}`).child(`portfolioobjectives`).push();
          newPO.set({
            learningobjectiveid: portfolioobjectives[0].learningobjectiveid,
            content: portfolioobjectives[0].content
          })
        }
      })
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
