import { UPDATE_FILTER } from '../types';

const updateFilter = filter => {
  return dispatch => {
    dispatch({
      type: UPDATE_FILTER,
      filter
    });
  }
};

export default {
  updateFilter
};