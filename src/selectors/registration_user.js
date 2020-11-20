export default (registrations_user, userid) => {
  return registrations_user.sort((a, b) => {
    return a.rating < b.rating ? 1 : -1;
  });
};