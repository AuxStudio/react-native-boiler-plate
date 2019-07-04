import { call, put } from 'redux-saga/effects';

import { notifications } from '../../../../services';
import { app } from '../../../../utils';

export default function* requestNotificationsPermission(action) {
  try {
    const response = yield call(notifications.requestPermission);
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
