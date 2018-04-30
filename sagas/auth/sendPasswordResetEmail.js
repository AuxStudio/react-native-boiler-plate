import { call, put } from 'redux-saga';
import { auth } from '../../services';

export default function* sendPasswordResetEmail(action) {
  try {
    const response = yield call(auth.sendPasswordResetEmail, action);

    if (response) {
      if (action.nextAction) {
        yield put({
          ...action.nextAction,
          payload: response,
        });
      }
    }
  } catch (error) {
    const payload = error instanceof Error ? error : new Error(error);

    yield put({
      type: 'SET_SYSTEM_MESSAGE',
      payload,
      error: true,
    });
  }
}
