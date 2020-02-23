//œimport * as actions from 'state/actions';

export const test = function*(action) {};

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
