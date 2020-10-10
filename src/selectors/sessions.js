import moment from 'moment/moment';

// Get visible courses

// export default (sessions, { courseid }) => {
//     return sessions.sort((a, b) => {
//       return a.session_number > b.session_number ? 1 : -1;
//     });
// };

export default (sessions, courseid) => {
    return sessions.filter((session) => {
      const courseMatch = session.courseid === courseid;
      return courseMatch;
    }).sort((a, b) => {
        return a.session_date > b.session_date ? 1 : -1;
    });
  
  };