import * as actions from 'state/actions';
import * as helper from './helper.js';
import { put } from 'redux-saga/effects';

export const getBasicStats = function*(action) {
  try {
    const response = yield helper.anonymousAPI('GET', `info`);
    let response_json = yield response.json();
    if (response.ok) {
      yield put({
        type: actions.GET_BASIC_STATS__R,
        payload: response_json
      });
    } else {
      yield put({
        type: actions.SAGA_ERROR,
        payload: {
          error: `CODE: ${response.status} ${JSON.stringify(response_json)}`,
          source: action.type
        }
      });
    }
  } catch (e) {
    yield put({
      type: actions.SAGA_ERROR,
      payload: {
        error: e,
        source: action.type
      }
    });
  }
};

export const sagaError = function*(action) {
  window.dispatchEvent(
    new CustomEvent('fatalError', {
      detail: { source: action.payload.source, error: action.payload.error }
    })
  );
  yield console.error(
    `😫 SAGA FATAL (${action.payload.source}): ${
      action.payload.error ? action.payload.error : 'UNKNOWN'
    }`
  );
};

export const sagaErrorNonfatal = function*(action) {
  yield console.warn(
    `😫 SAGA NONFATAL ERROR (${action.payload.source}): ${
      action.payload.error ? action.payload.error : 'UNKNOWN'
    }`
  );
};
