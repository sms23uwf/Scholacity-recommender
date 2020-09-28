// Get visible learning objectives

export default (courses, { text, disposition, sortBy, startDate, endDate }) => {
    return courses.filter((course) => {
      const textMatch = course.knowledgeareaid.toLowerCase().includes(text.toLowerCase());
      return textMatch;
    }).sort((a, b) => {
        return a.content < b.content ? 1 : -1;
    });
  };