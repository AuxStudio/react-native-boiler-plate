import utils from '../../utils';

export default function post(url, headers, body) {
  return new Promise((resolve, reject) => {
    utils.log('start post', { url, headers, body });

    fetch(url, {
      method: 'POST',
      headers,
      body,
    })
      .then((data) => {
        const response = data && { data };
        utils.log('end post', response);

        resolve(response);
      })
      .catch((error) => {
        utils.log('end post', { error });

        reject(utils.createError(error));
      });
  });
}
