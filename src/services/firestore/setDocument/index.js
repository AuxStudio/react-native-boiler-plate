import utils from '../../../utils';
import getRef from '../getRef';

export default function setDocument(pathParts, document) {
  return new Promise((resolve, reject) => {
    getRef(pathParts)
      .then((ref) => {
        ref
          .set(document)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(utils.app.createError(error));
          });
      })
      .catch((error) => {
        reject(utils.app.createError(error));
      });
  });
}
