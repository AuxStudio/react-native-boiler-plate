import { call, put } from 'redux-saga/effects';
import { location } from '../../services';

export default function* getDeviceLocation() {
  try {
    const response = yield call(location.getDeviceLocation);

    if (__DEV__) {
      console.log('getDeviceLocation', response);
    }

    yield put({
      type: 'SET_DEVICE_LOCATION',
      payload: response,
    });
  } catch (error) {
    yield put({
      type: 'SET_MESSAGE',
      payload: new Error(error),
      error: true,
    });
  }
}
