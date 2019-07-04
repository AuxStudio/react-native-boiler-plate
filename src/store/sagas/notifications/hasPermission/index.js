import { call, put } from 'redux-saga/effects';

import { notifications } from '../../../../services';
import { app } from '../../../../utils';

export default function* hasPermission(action) {
  try {
    const response = yield call(notifications.hasPermission);
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
      },
    });
  }
}
