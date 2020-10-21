export default (registrations) => {
    return registrations
        .map((registration) => 1)
        .reduce((sum, value) => sum + value, 0);
  };
  