import utils from '../../../utils';

export default function post(url, headers, parameters) {
  return new Promise((resolve, reject) => {
    if (url) {
      fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(parameters),
      })
        .then((data) => {
          const response = data && { data };
          resolve(response);
        })
        .catch((error) => {
          reject(utils.app.createError(error));
        });
    } else {
      reject(new Error('URL is required'));
    }
  });
}
