import moment from 'moment/moment';

// Get visible courses

export default (courses, { disposition, sortBy, startDate, endDate }) => {
  return courses.sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });
};