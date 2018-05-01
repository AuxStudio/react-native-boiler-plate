import { call, put } from 'redux-saga/effects';
import { location } from '../../services';

export default function* getDeviceLocation(action) {
  try {
    const response = yield call(location.getDeviceLocation);

    if (__DEV__) {
      console.log('getDeviceLocation', response);
    }

    if (action.meta.nextAction) {
      yield put({
        ...action.meta.nextAction,
        payload: response,
      });
    }
  } catch (error) {
    const payload = error instanceof Error ? error : new Error(error);

    yield put({
      type: 'SET_SYSTEM_MESSAGE',
      payload,
      error: true,
    });
  }
}
