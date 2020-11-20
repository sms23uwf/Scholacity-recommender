
// Get visible course recommendations

// export default (courserecommendations, { userid, disposition }) => {
//   return courserecommendations.filter((courserecommendation) => {
//     const recommendedMatch = courserecommendation.disposition.toLowerCase().includes("recommended");
//     const undecidedMatch = courserecommendation.disposition.toLowerCase().includes("undecided");
//     const rejectedMatch = courserecommendation.disposition.toLowerCase().includes("rejected");
//     return (recommendedMatch || undecidedMatch || rejectedMatch);
//   }).sort((a, b) => {
//       return a.rating > b.rating ? 1 : -1;
//   });
// };

export default (courserecommendations) => {
  return courserecommendations.sort((a, b) => {
    return a.rating < b.rating ? 1 : -1;
  });
};


export const findExistingCourseRecommendation = (courserecommendations, {courseid}) => {
  return courserecommendations.filter((courserecommendation) => {
    const courseMatch = courserecommendation.courseid === courseid;
    return courseMatch;
  });

};