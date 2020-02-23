import { takeLatest, all } from 'redux-saga/effects';
import * as actions from 'state/actions';
import * as app from './app.js';

export default function* rootSaga() {
  yield all([
    takeLatest(actions.TEST, app.test),
    takeLatest(actions.SAGA_ERROR, app.sagaError),
    takeLatest(actions.SAGA_ERROR_NONFATAL, app.sagaErrorNonfatal)
  ]);
}
