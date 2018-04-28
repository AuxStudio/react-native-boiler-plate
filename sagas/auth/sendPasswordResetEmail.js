import { call, put } from 'redux-saga';
import { auth } from '../../services';
import config from '../../config';

export default function* sendPasswordResetEmail(action) {
  try {
    const { payload, error } = yield call(auth.sendPasswordResetEmail, action);

    if (error) {
      yield put({
        type: 'SET_MESSAGE',
        payload: new Error(payload),
        error: true,
      });
    } else {
      yield put({
        type: 'SET_MESSAGE',
        payload: config.messages.auth.passwordResetEmailSuccess,
        error: false, // success
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
