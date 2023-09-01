import { API_TIMEOUT } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  const res = await Promise.race([fetch(`${url}`), timeout(API_TIMEOUT)]);
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (Code: ${res.status})`);

  return data;
};
