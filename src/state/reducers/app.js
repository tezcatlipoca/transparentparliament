import initialState from './app_init';
import * as actions from 'state/actions';

export default function app(state = initialState, action) {
  switch (action.type) {
    case actions.TEST:
      return state;
    default:
      return state;
  }
}
