import { call, put } from 'redux-saga/effects';

import { permissions } from '../../../../services';
import { app } from '../../../../utils';

export default function* requestPermission(action) {
  try {
    const response = yield call(permissions.requestPermission, action.payload.permission);
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
