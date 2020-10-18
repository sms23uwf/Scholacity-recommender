

// SET_DAYS_OF_WEEK
export const setDaysOfWeek = (days_of_week) => ({
  type: 'SET_DAYS_OF_WEEK',
  days_of_week
});

export const startSetDaysOfWeek = () => {
  return (dispatch, getState) => {
    const days_of_week = [
         { id: 1, name: "Sunday" },
         { id: 2, name: "Monday" },
         { id: 3, name: "Tuesday" },
         { id: 4, name: "Wednesday" },
         { id: 5, name: "Thursday" },
         { id: 6, name: "Friday" },
         { id: 7, name: "Saturday" }
    ];

    dispatch(setDaysOfWeek(days_of_week));
  };
};