export default (courseselections) => {
    return courseselections
        .map((courseselection) => courseselection.counter)
        .reduce((sum, value) => sum + value, 0);
  };
  