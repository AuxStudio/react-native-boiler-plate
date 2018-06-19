import utils from '../../../utils';

export default function get(url) {
  return new Promise((resolve, reject) => {
    if (url) {
      utils.app.log('start get', { url });

      fetch(url)
        .then((data) => {
          const response = data && { data };
          utils.app.log('end get', response);
          resolve(response);
        })
        .catch((error) => {
          utils.app.log('end get', { error });
          reject(utils.app.createError(error));
        });
    } else {
      reject(new Error('URL is required'));
    }
  });
}
