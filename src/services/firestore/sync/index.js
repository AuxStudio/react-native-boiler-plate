import utils from '../../../utils';
import getRef from '../getRef';

export default function sync(pathParts, query, callback) {
  return new Promise((resolve, reject) => {
    getRef(pathParts)
      .then((ref) => {
        let newRef;

        if (query) {
          newRef = ref.where(...query);
        } else {
          newRef = ref;
        }

        const unsubscribe = newRef.onSnapshot(callback);

        resolve(unsubscribe);
      })
      .catch((error) => {
        reject(utils.app.createError(error));
      });
  });
}
