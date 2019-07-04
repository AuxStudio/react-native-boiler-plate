import { call, put } from 'redux-saga/effects';

import { location } from '../../../../services';
import { app } from '../../../../utils';

export default function* getFormattedAddressFromCoords(action) {
  try {
    const response = yield call(
      location.getFormattedAddressFromCoords,
      action.payload.latitude,
      action.payload.longitude,
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
