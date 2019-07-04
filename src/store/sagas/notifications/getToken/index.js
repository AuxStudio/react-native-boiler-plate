import { call, put } from 'redux-saga/effects';

import { notifications } from '../../../services';
import utils from '../../../utils';

export default function* getToken(action) {
  try {
    const response = yield call(notifications.getToken);
    const nextAction = utils.app.prepareNextAction(action, response);

    if (nextAction) {
      yield put(nextAction);
    }
  } catch (error) {
    yield put({
      type: 'logError',
      payload: {
        error: utils.app.createError(error),
        date: Date.now(),
      },
    });
  }
}
