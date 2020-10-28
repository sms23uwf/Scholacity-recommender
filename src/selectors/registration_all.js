export default (registrations_all) => {
    return registrations_all.sort((a, b) => {
        return a.registration_status < b.registration_status ? 1 : -1;
    });
};