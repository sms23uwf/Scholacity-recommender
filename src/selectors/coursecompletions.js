
// Get visible course recommendations

export default (courserecommendations, { userid, disposition }) => {
  return courserecommendations.filter((courserecommendation) => {
    const ratingMatch = courserecommendation.disposition.toLowerCase().includes("portfolio");
    const accepteddMatch = courserecommendation.disposition.toLowerCase().includes("accepted");
    return ratingMatch;
  }).sort((a, b) => {
      return a.rating < b.rating ? 1 : -1;
  });
};