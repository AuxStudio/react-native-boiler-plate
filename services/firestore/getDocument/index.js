import utils from '../../../utils';
import getRef from '../getRef';

export default function getDocument(pathParts) {
  return new Promise((resolve, reject) => {
    getRef(pathParts)
      .then((ref) => {
        ref
          .get()
          .then((document) => {
            try {
              resolve({ document: document.data() });
            } catch (error) {
              if (document.docs && true) {
                reject(
                  utils.app.createError(
                    `${pathParts.join('/')} references a collection, not a document`,
                  ),
                );
              } else {
                reject(utils.app.createError(error));
              }
            }
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
