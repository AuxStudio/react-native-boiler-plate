import utils from '../../../utils';

export default function post(url, headers, parameters) {
  return new Promise((resolve, reject) => {
    if (url) {
      utils.app.log('start post', { url, headers, parameters });

      fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(parameters),
      })
        .then((data) => {
          const response = data && { data };
          utils.app.log('end post', response);

          resolve(response);
        })
        .catch((error) => {
          utils.app.log('end post', { error });

          reject(utils.app.createError(error));
        });
    } else {
      reject(new Error('URL is required'));
    }
  });
}
