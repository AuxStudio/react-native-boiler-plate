import { call, put } from 'redux-saga/effects';
import auth from '../../services/auth';

export default function* getUserCredentialFromGoogle() {
  try {
    const { payload, error } = yield call(auth.getUserCredentialFromGoogle);

    if (__DEV__) {
      console.log('getUserCredentialFromGoogle', payload);
    }

    if (error) {
      yield put({
        type: 'SET_MESSAGE',
        payload: new Error(payload),
        error: true,
      });
    } else {
      yield put({
        type: 'linkUserWithCredential',
        payload: {
          ...payload,
        },
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
