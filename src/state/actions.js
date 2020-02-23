function action(type, payload = {}) {
  return { type, payload };
}

export const TEST = 'TEST';
export const test = payload => action(TEST, payload);
export const SAGA_ERROR = 'SAGA_ERROR';
export const SAGA_ERROR_NONFATAL = 'SAGA_ERROR_NONFATAL';
