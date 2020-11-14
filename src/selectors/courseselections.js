
// Get visible course selections

  export default (courseselections, { userid, disposition }) => {
    return courseselections.sort((a, b) => {
      return a.rating < b.rating && a.rating == `-1` ? -1 : a.rating < b.rating ? 1 : -1;
    });
  };
  