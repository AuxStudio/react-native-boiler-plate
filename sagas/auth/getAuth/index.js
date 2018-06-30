import { call, put } from 'redux-saga/effects';

import { auth } from '../../../services';
import utils from '../../../utils';

export default function* getAuth(action) {
  try {
    const response = yield call(auth.getAuth);
    const nextAction = utils.app.prepareNextAction(action, response);

    if (nextAction) {
      yield put(nextAction);
    } else if (response) {
      yield put({
        type: 'SIGN_IN_USER',
        payload: response,
      });
    } else {
      yield put({
        type: 'signInAnonymously',
      });
    }
  } catch (error) {
    yield put({
      type: 'logError',
      payload: {
        error: utils.app.createError(error),
        date: new Date(),
        action,
      },
    });
  }
}
