import { call, put } from 'redux-saga/effects';

import { location } from '../../../services';
import utils from '../../../utils';

export default function* getDeviceLocation(action) {
  try {
    const response = yield call(location.getDeviceLocation);
    const nextAction = utils.app.prepareNextAction(action, response);

    if (nextAction) {
      yield put(nextAction);
    } else if (response) {
      yield put({
        type: 'SET_DEVICE_LOCATION',
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: 'logError',
      payload: {
        error: utils.app.createError(error),
        date: Date.now(),
        action,
      },
    });
  }
}
