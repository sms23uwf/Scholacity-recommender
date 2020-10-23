
const admin_ratings_lo_alignmentReducerDefaultState = [];

export default (state = admin_ratings_lo_alignmentReducerDefaultState, action) => {

  switch (action.type) {
    case 'SET_ALL_LO_ALIGNMENT_RATINGS':
      return action.lo_alignment_ratings_all;
    default:
      return state;
  }
};