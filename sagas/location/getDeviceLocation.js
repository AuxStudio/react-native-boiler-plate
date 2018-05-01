import { call, put } from 'redux-saga/effects';
import { location } from '../../services';
import utils from '../../utils';

export default function* getDeviceLocation(action) {
  try {
    const response = yield call(location.getDeviceLocation);

    if (action.meta.nextAction) {
      yield put({
        ...action.meta.nextAction,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: 'SET_SYSTEM_MESSAGE',
      payload: utils.createError(error),
      error: true,
    });
  }
}
