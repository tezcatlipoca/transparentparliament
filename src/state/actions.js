function action(type, payload = {}) {
  return { type, payload };
}

export const TEST = 'TEST';
export const test = payload => action(TEST, payload);
export const SAGA_ERROR = 'SAGA_ERROR';
export const SAGA_ERROR_NONFATAL = 'SAGA_ERROR_NONFATAL';

export const GET_BASIC_STATS = 'GET_BASIC_STATS';
export const GET_BASIC_STATS__R = 'GET_BASIC_STATS__R';
export const getBasicStats = payload => action(GET_BASIC_STATS, payload);
