import { call, put } from 'redux-saga';
import { auth } from '../../services';
import config from '../../config';

export default function* signInUserWithCredential(action) {
  try {
    const { payload, error } = yield call(auth.signInUserWithCredential, action);

    if (__DEV__) {
      console.log('signInUserWithCredentialResponse', payload);
    }

    if (error) {
      if (payload.message.code === 'auth/account-exists-with-different-credential') {
        yield put({
          type: 'SET_MESSAGE',
          payload: new Error(config.messages.auth.accountAlreadyExists),
          error: true,
        });
      } else {
        yield put({
          type: 'SET_MESSAGE',
          payload: new Error(payload),
          error: true,
        });
      }
    } else {
      yield put({
        type: 'SIGN_IN_USER',
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
