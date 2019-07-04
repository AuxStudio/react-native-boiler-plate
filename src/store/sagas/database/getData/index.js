import { call, put } from 'redux-saga/effects';

import { database } from '../../../../services';
import { app } from '../../../../utils';

export default function* getData(action) {
  try {
    const response = yield call(database.getData, action.payload.ref);
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
