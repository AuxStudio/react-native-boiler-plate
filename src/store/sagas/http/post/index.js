import { call, put } from 'redux-saga/effects';

import { http } from '../../../../services';
import { app } from '../../../../utils';

export default function* post(action) {
  try {
    const response = yield call(
      http.post,
      action.payload.url,
      action.payload.headers,
      action.payload.parameters,
    );
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
