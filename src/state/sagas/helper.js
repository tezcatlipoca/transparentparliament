import CONST from 'constants';

export const signed = (method, url, token, body = {}) => {
  let request = {
    method: method,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json; charset=utf-8',
      Prefer: method === 'POST' ? 'return=representation' : ''
    },
    body: typeof body === 'string' ? body : JSON.stringify(body)
  };
  if (!body || method === 'GET') delete request.body;
  return fetch(url, request);
};

export const anonymous = (method, url, body) => {
  let request = {
    method: method,
    headers: CONST.ANON_HEADERS,
    body: typeof body === 'string' ? body : JSON.stringify(body)
  };
  if (!body || method === 'GET') delete request.body;
  return fetch(url, request);
};

export const embedded = (id, url) => {
  url = `/${id}/assets/${url}`;
  return anonymous('GET', url);
};

export const anonymousAPI = (method, url, body) => {
  url = `${process.env.REACT_APP_API_URL}/${url}`;
  return anonymous(method, url, body);
};

export const signedAPI = (method, url, token, body) => {
  url = `${process.env.REACT_APP_API_URL}/${url}`;
  return signed(method, url, token, body);
};
