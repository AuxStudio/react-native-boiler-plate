import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';

export default function* getUserAuth() {
  try {
    const { payload } = yield call(auth.getUserAuth);

    if (__DEV__) {
      console.log('getUserAuth', payload);
    }

    if (payload) {
      yield put({
        type: 'SIGN_IN_USER',
        payload,
      });
    } else {
      yield put({
        type: 'signInUserAnonymously',
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
