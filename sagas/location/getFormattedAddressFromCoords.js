import { call, put } from 'redux-saga/effects';
import { location } from '../../services';

export default function* getFormattedAddressFromCoords(action) {
  try {
    const response = yield call(location.getFormattedAddressFromCoords, action.payload.coords);

    if (__DEV__) {
      console.log('getFormattedAddressFromCoords', response);
    }

    if (action.nextAction) {
      yield put({
        ...action.nextAction,
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
