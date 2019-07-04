import { call, put } from 'redux-saga/effects';

import { firestore } from '../../../../services';
import { app } from '../../../../utils';

export default function* enableNetwork(action) {
  try {
    const response = yield call(firestore.enableNetwork);
    const nextAction = app.prepareNextAction(action, response);

    if (nextAction) {
      yield put(nextAction);
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
