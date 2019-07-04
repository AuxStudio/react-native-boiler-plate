import { call, put } from 'redux-saga/effects';

import { auth } from '../../../../services';
import { app } from '../../../../utils';

export default function* getCredentialFromGoogle(action) {
  try {
    const response = yield call(auth.getCredentialFromGoogle);
    const nextAction = app.prepareNextAction(action, response);

    if (nextAction) {
      yield put(nextAction);
    } else if (response) {
      yield put({
        type: 'SIGN_IN_USER',
        payload: response,
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
