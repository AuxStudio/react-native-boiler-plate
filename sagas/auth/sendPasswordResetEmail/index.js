import { call, put } from 'redux-saga/effects';

import { auth } from '../../../services';
import utils from '../../../utils';

export default function* sendPasswordResetEmail(action) {
  try {
    const response = yield call(auth.sendPasswordResetEmail, action.payload.email);
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
