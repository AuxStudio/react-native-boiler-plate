import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';

export default function* getUserCredentialFromEmail() {
  try {
    const { payload } = yield call(auth.getUserCredentialFromEmail);

    if (__DEV__) {
      console.log('getUserCredentialFromEmail', payload);
    }

    yield put({
      type: 'linkUserWithCredential',
      payload: {
        ...payload,
      },
    });
  } catch (error) {
    yield put({
      type: 'SET_MESSAGE',
      payload: new Error(error),
      error: true,
    });
  }
}
