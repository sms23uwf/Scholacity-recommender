
// Get visible selections

  export default (recommendation_learningobjectives, { userId, learningobjectiveid }) => {
    return recommendation_learningobjectives.filter((recommendation_learningobjective) => {
        const loMatch = recommendation_learningobjective.learningobjectiveid === learningobjectiveid;
      return loMatch;
    });
  };