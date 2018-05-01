import utils from '../../utils';

export default function get(url) {
  return new Promise((resolve, reject) => {
    utils.log('start get', { url });

    fetch(url)
      .then((response) => {
        utils.log('end get', { response });

        resolve(response);
      })
      .catch((error) => {
        utils.log('end get', { error });

        reject(utils.createError(error));
      });
  });
}
