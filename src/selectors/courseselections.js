
// Get visible course selections

  export default (courseselections, { userid, disposition }) => {
    return courseselections.sort((a, b) => {
        return a.rating < b.rating ? 1 : -1;
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