import { call, put } from 'redux-saga';
import { auth } from '../../services';
import config from '../../config';

export default function* signInUserWithCredential(action) {
  try {
    const { payload } = yield call(auth.signInUserWithCredential, action);

    if (__DEV__) {
      console.log('signInUserWithCredentialResponse', payload);
    }

    yield put({
      type: 'SIGN_IN_USER',
      payload,
    });
  } catch (error) {
    if (error.message.code === 'auth/account-exists-with-different-credential') {
      yield put({
        type: 'SET_MESSAGE',
        payload: new Error(config.messages.auth.accountAlreadyExists),
        error: true,
      });
    } else {
      yield put({
        type: 'SET_MESSAGE',
        payload: new Error(error),
        error: true,
      });
    }
  }
}
