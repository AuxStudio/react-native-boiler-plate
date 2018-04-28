import { call, put } from 'redux-saga/effects';
import { location } from '../../services';

export default function* getFormattedAddressFromCoordinates(action) {
  try {
    const { payload } = yield call(location.getFormattedAddressFromCoordinates);

    if (__DEV__) {
      console.log('getFormattedAddressFromCoordinates', payload);
    }

    if (action.nextAction) {
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
