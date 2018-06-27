import { eventChannel } from 'redux-saga';

import { firestore } from '../../../../services';

export default function createChannel(pathParts) {
  return eventChannel((emit) => {
    firestore.sync(pathParts, emit);
    // The subscriber must return an unsubscribe function
    return () => {};
  });
}
