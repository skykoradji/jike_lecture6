import { UPDATE_FILTER } from '../types';

const initialState = {
  filter: 'ALL'
};

const filterBy = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILTER:
      return { filter: action.filter };
    default:
      return state;
  }
};

export default filterBy;
