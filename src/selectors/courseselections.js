
// Get visible course selections

  export default (courseselections, { userid, disposition }) => {
    return courseselections.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
    });
  };
  