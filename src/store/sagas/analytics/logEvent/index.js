import { call, put } from 'redux-saga/effects';

import { analytics } from '../../../../services';
import { app } from '../../../../utils';

export default function* logEvent(action) {
  try {
    const response = yield call(analytics.logEvent, action.payload.event, action.payload.params);
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
