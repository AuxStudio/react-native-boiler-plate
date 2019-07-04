import utils from '../../../utils';
import getRef from '../getRef';

// Gets a collection from firestore, queries it (if query (array) provided) and
// parses the snapshot to return docs data only
export default function getCollection(pathParts, query) {
  return new Promise((resolve, reject) => {
    getRef(pathParts)
      .then((ref) => {
        let newRef;

        if (query) {
          newRef = ref.where(...query);
        } else {
          newRef = ref;
        }

        newRef
          .get()
          .then((collection) => {
            try {
              const collectionArray = collection.docs.map((document) => {
                return {
                  ...document.data(),
                  id: document.id,
                };
              });

              resolve({ collection: collectionArray });
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
