import utils from '../../../utils';

export default function get(url) {
  return new Promise((resolve, reject) => {
    if (url) {
      fetch(url)
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
