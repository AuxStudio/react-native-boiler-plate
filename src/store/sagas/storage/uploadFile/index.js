import { call, put } from 'redux-saga/effects';

import { storage } from '../../../services';
import utils from '../../../utils';

export default function* uploadFile(action) {
  try {
    const response = yield call(storage.uploadFile, action.payload.ref, action.payload.uri);
    const nextAction = utils.app.prepareNextAction(action, response);

    if (nextAction) {
      yield put(nextAction);
    }
  } catch (error) {
    yield put({
      type: 'logError',
      payload: {
        error: utils.app.createError(error),
        date: Date.now(),
        action,
      },
    });
  }
}
