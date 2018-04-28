import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';

export default function* getUserCredentialFromFacebook() {
  try {
    const { payload } = yield call(auth.getUserCredentialFromFacebook);

    if (__DEV__) {
      console.log('getUserCredentialFromFacebook', payload);
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
