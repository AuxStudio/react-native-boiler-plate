import { call, put } from 'redux-saga/effects';

import { notifications } from '../../../services';
import utils from '../../../utils';

export default function* requestNotificationsPermission(action) {
  try {
    const response = yield call(notifications.requestPermission);
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
