import { call, put } from 'redux-saga';
import { auth } from '../../services';
import config from '../../config';

export default function* sendPasswordResetEmail(action) {
  try {
    const response = yield call(auth.sendPasswordResetEmail, action);

    if (response) {
      yield put({
        type: 'SET_MESSAGE',
        payload: config.messages.auth.passwordResetEmailSuccess,
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
