
// Get visible course selections

export default (courseselections, { userid, disposition }) => {
    return courseselections.filter((courseselection) => {
      const selectedMatch = courseselection.disposition.toLowerCase().includes("selected");
      const registeredMatch = courseselection.disposition.toLowerCase().includes("registered");
      return (selectedMatch || registeredMatch || 1 == 1);
    }).sort((a, b) => {
        return a.disposition > b.disposition ? 1 : -1;
    });
  };
  
  export const findExistingCourseSelection = (courseselections, {userid, courseid}) => {
    return courseselections.filter((courseselection) => {
      const courseMatch = courseselection.courseid === courseid;
      return courseMatch;
    }).sort((a, b) => {
        return a.disposition < b.disposition ? 1 : -1;
    });
  
  };