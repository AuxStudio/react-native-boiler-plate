import utils from '../../../utils';
import getRef from '../getRef';

export default function getCollection(pathParts) {
  return new Promise((resolve, reject) => {
    getRef(pathParts)
      .then((ref) => {
        ref
          .get()
          .then((collection) => {
            try {
              resolve({ collection: collection.docs });
            } catch (error) {
              if (collection.docs && true) {
                reject(
                  utils.app.createError(
                    `${pathParts.join('/')} references a document, not a collection`,
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
