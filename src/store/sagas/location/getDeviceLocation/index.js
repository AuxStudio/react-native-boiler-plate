import { call, put } from 'redux-saga/effects';

import { location } from '../../../../services';
import { app } from '../../../../utils';

export default function* getDeviceLocation(action) {
  try {
    const response = yield call(location.getDeviceLocation);
    const nextAction = app.prepareNextAction(action, response);

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
        error: app.createError(error),
        date: Date.now(),
        action,
      },
    });
  }
}
