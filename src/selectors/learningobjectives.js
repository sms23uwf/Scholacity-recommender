// Get visible learning objectives

export default (learningobjectives, { text, disposition, userId, learningobjectiveid, sortBy, startDate, endDate }) => {
  return learningobjectives.filter((learningobjective) => {
    const textMatch = learningobjective.knowledgeareaid.toLowerCase().includes(text.toLowerCase());
    return textMatch;
  }).sort((a, b) => {
      return a.content < b.content ? 1 : -1;
  });
};