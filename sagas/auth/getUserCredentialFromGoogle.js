import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';

export default function* getUserCredentialFromGoogle() {
  try {
    const { payload } = yield call(auth.getUserCredentialFromGoogle);

    if (__DEV__) {
      console.log('getUserCredentialFromGoogle', payload);
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
