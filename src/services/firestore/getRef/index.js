import firebase from 'react-native-firebase';

import { app } from '../../../utils';

// Takes an array of alternating collection and document names
// e.g. [ collection, doc, collection, doc ]
// and returns a firestore ref
export default function getRef(pathParts) {
  return new Promise((resolve, reject) => {
    if (pathParts) {
      let ref = firebase.firestore();
      let isCollection = true; // always starts with a collection

      try {
        pathParts.forEach((pathPart) => {
          ref = isCollection ? ref.collection(pathPart) : ref.doc(pathPart);
          isCollection = !isCollection;
        });

        resolve(ref);
      } catch (error) {
        reject(app.createError(error));
      }
    } else {
      reject(app.createError('Please provide an array of alternating collections and documents'));
    }
  });
}
