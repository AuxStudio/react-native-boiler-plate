import { call, put } from 'redux-saga/effects';
import { location } from '../../services';
import utils from '../../utils';

export default function* getFormattedAddressFromCoords(action) {
  try {
    const response = yield call(
      location.getFormattedAddressFromCoords,
      action.payload.latitude,
      action.payload.longitude,
    );
    const nextAction = utils.prepareNextAction(action, response);

    if (nextAction) {
      yield put(nextAction);
    }
  } catch (error) {
    yield put({
      type: 'SET_SYSTEM_MESSAGE',
      payload: utils.createError(error),
      error: true,
    });
  }
}
