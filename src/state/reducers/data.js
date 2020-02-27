import initialState from './data_init';
import * as actions from 'state/actions';

export default function data(state = initialState, action) {
  switch (action.type) {
    case actions.GET_BASIC_STATS__R: {
      let info = {};
      action.payload.forEach(datum => (info[datum.key] = datum.val));
      return { ...state, info };
    }
    default:
      return state;
  }
}
