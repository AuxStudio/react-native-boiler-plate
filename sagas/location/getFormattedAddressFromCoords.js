import { call, put } from 'redux-saga/effects';
import { location } from '../../services';

export default function* getFormattedAddressFromCoordinates(action) {
  try {
    const response = yield call(location.getFormattedAddressFromCoordinates);

    if (__DEV__) {
      console.log('getFormattedAddressFromCoordinates', response);
    }

    if (action.nextAction) {
      yield put({
        ...action.nextAction,
        payload: response,
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
