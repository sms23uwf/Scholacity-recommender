
const ratingsAdminReducerDefaultState = [];

export default (state = ratingsAdminReducerDefaultState, action) => {

  switch (action.type) {
    case 'SET_ALL_LO_ALIGNMENT_RATINGS':
      return [
        ...state,
        action.lo_alignment_ratings_all
      ];
    case 'SET_ALL_COURSE_OFFERING_RATINGS':
    return [
        ...state,
        action.course_offering_ratings_all
    ];
    case 'SET_ALL_COURSE_SATISFACTION_RATINGS':
        return [
            ...state,
            action.course_satisfaction_ratings_all
        ];
    default:
      return state;
  }
};