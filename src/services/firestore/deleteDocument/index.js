import { app } from '../../../utils';
import getRef from '../getRef';

export default function deleteDocument(pathParts) {
  return new Promise((resolve, reject) => {
    getRef(pathParts)
      .then((ref) => {
        ref
          .delete()
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
