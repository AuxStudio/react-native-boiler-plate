import { eventChannel } from 'redux-saga';

import { firestore } from '../../../../services';

export default function createChannel(pathParts, query) {
  return eventChannel((emit) => {
    firestore.sync(pathParts, query, emit);
    // The subscriber must return an unsubscribe function
    return () => {};
  });
}
