import { call, put } from 'redux-saga/effects';

import location from '../../services/location';

export default function* getDeviceLocation() {
  try {
    const { payload, error } = yield call(location.getDeviceLocation);

    if (__DEV__) {
      console.log('getDeviceLocation', payload);
    }

    if (error) {
      yield put({
        type: 'SET_MESSAGE',
        payload: new Error(payload),
        error: true,
      });
    } else {
      yield put({
        type: 'SET_DEVICE_LOCATION',
        payload,
      });
    }
  } catch (error) {
    yield put({
      type: 'SET_MESSAGE',
      payload: new Error(error),
      error: true,
    });
  }
}
