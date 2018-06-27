import { eventChannel } from 'redux-saga';
import { call, take, put } from 'redux-saga/effects';

import { firestore } from '../../../services';
import utils from '../../../utils';

function createChannel(pathParts) {
  return eventChannel((emit) => {
    firestore.sync(pathParts, emit);
    // The subscriber must return an unsubscribe function
    return () => {};
  });
}

export default function* sync(action) {
  const channel = yield call(createChannel, action.meta.pathParts);

  try {
    while (true) {
      const response = yield take(channel);
      const nextAction = utils.app.prepareNextAction(action, response);

      if (nextAction) {
        yield put(nextAction);
      }
    }
  } catch (error) {
    yield put({
      type: 'SET_SYSTEM_MESSAGE',
      payload: utils.app.createError(error),
      error: true,
    });
  }
}
