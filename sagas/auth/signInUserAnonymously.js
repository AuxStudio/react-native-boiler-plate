import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';

export default function* signInUserAnonymously() {
  try {
    const { payload } = yield call(auth.signInUserAnonymously);

    if (__DEV__) {
      console.log('signInUserAnonymously', payload);
    }

    yield put({
      type: 'SIGN_IN_USER',
      payload,
    });
  } catch (error) {
    yield put({
      type: 'SET_MESSAGE',
      payload: new Error(error),
      error: true,
    });
  }
}
