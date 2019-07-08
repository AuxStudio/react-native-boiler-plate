import { app } from '../../../utils';
import getRef from '../getRef';

export default function updateDocument(pathParts, document) {
  return new Promise((resolve, reject) => {
    getRef(pathParts)
      .then((ref) => {
        ref
          .update(document)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(app.createError(error));
          });
      })
      .catch((error) => {
        reject(app.createError(error));
      });
  });
}
