import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';
import utils from '../../utils';

export default function* signInWithCredential(action) {
  try {
    const response = yield call(auth.signInWithCredential, action.payload.credential);

    if (action.meta.nextAction) {
      yield put({
        ...action.meta.nextAction,
        payload: response,
      });
    }
  } catch (error) {
    if (error.message.code === 'auth/account-exists-with-different-credential') {
      yield put({
        type: 'SET_SYSTEM_MESSAGE',
        payload: utils.createError(
          "Hello! You've already signed in with someone else. Please try another option.",
        ),
        error: true,
      });
    } else {
      yield put({
        type: 'SET_SYSTEM_MESSAGE',
        payload: utils.createError(error),
        error: true,
      });
    }
  }
}
