import { call, put } from 'redux-saga/effects';

import { analytics } from '../../../services';
import utils from '../../../utils';

export default function* logEvent(action) {
  try {
    const response = yield call(analytics.logEvent, action.payload.event, action.payload.params);
    const nextAction = utils.app.prepareNextAction(action, response); // TODO: this should work regardless of a response or not

    if (nextAction) {
      yield put(nextAction);
    }
  } catch (error) {
    yield put({
      type: 'logError',
      payload: {
        error: utils.app.createError(error),
        date: new Date(),
      },
    });
  }
}
