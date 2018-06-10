import utils from '../../../utils';

export default function post(url, headers, body) {
  return new Promise((resolve, reject) => {
    utils.app.log('start post', { url, headers, body });

    fetch(url, {
      method: 'POST',
      headers,
      body,
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
  });
}
