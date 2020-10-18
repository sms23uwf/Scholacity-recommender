import moment from 'moment/moment';

// Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  disposition: '',
  userId: '',
  learningobjectiveid: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SET_DISPOSITION_FILTER':
      return {
        ...state,
        disposition: action.disposition
      };
    case 'SET_UUID_FILTER':
      return {
        ...state,
        userId: action.userId
      };
    case 'SET_DOMAIN_FILTER':
      return {
        ...state,
        domain: action.domain
      };        
    case 'SET_LO_FILTER':
      return {
        ...state,
        learningobjectiveid: action.learningobjectiveid
      };   
    case 'SET_COURSE_FILTER':
      return {
        ...state,
        courseid: action.courseid
      }
      case 'SET_DOW_FILTER':
        return {
          ...state,
          dow: action.dow
        }
      case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};
