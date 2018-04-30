import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';

export default function* getUserAuth(action) {
  try {
    const response = yield call(auth.getUserAuth);

    if (__DEV__) {
      console.log('getUserAuth', response);
    }

    if (response) {
      if (action.nextAction) {
        yield put({
          ...action.nextAction,
          payload: response,
        });
      }
    } else {
      yield put({
        type: 'signInUserAnonymously',
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
