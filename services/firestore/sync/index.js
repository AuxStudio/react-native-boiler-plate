import utils from '../../../utils';
import getRef from '../getRef';

export default function sync(pathParts, callback) {
  return new Promise((resolve, reject) => {
    getRef(pathParts)
      .then((ref) => {
        const unsubscribe = ref.onSnapshot(callback);

        resolve(unsubscribe);
      })
      .catch((error) => {
        reject(utils.app.createError(error));
      });
  });
}
