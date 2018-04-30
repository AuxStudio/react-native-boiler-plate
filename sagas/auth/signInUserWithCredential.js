import { call, put } from 'redux-saga';
import { auth } from '../../services';

export default function* signInUserWithCredential(action) {
  try {
    const response = yield call(auth.signInUserWithCredential, action);

    if (__DEV__) {
      console.log('signInUserWithCredentialResponse', response);
    }

    if (action.nextAction) {
      yield put({
        ...action.nextAction,
        payload: response,
      });
    }
  } catch (error) {
    if (error.message.code === 'auth/account-exists-with-different-credential') {
      yield put({
        type: 'SET_MESSAGE',
        payload: new Error(
          "Hello! You've already signed in with someone else. Please try another option.",
        ),
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
