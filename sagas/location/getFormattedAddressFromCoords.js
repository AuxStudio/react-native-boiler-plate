import { call, put } from 'redux-saga/effects';

import location from '../../services/location';

export default function* getFormattedAddressFromCoordinates(action) {
  try {
    const { payload, error } = yield call(location.getFormattedAddressFromCoordinates);

    if (__DEV__) {
      console.log('getFormattedAddressFromCoordinates', payload);
    }

    if (error) {
      yield put({
        type: 'SET_MESSAGE',
        payload: new Error(payload),
        error: true,
      });
    } else if (action.nextAction) {
      yield put({
        ...action.nextAction,
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
