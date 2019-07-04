import { call, put } from 'redux-saga/effects';

import { auth } from '../../../../services';
import { app } from '../../../../utils';

export default function* signOut(action) {
  try {
    const response = yield call(auth.signOut);
    const nextAction = app.prepareNextAction(action, response);

    if (nextAction) {
      yield put(nextAction);
    } else {
      yield put({
        type: 'SIGN_OUT_USER',
      });
    }
  } catch (error) {
    yield put({
      type: 'logError',
      payload: {
        error: app.createError(error),
        date: Date.now(),
        action,
      },
    });
  }
}
