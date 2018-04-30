import { call, put } from 'redux-saga/effects';
import { http } from '../../services';

export default function* post(action) {
  try {
    const response = yield call(http.get, action);

    if (__DEV__) {
      console.log('get', response);
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
