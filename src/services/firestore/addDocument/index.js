import utils from '../../../utils';
import getRef from '../getRef';

export default function addDocument(pathParts, document) {
  return new Promise((resolve, reject) => {
    getRef(pathParts)
      .then((ref) => {
        ref
          .add(document)
          .then((response) => {
            resolve({ id: response.id });
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
