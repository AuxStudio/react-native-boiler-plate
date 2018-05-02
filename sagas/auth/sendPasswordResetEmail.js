import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';
import utils from '../../utils';

export default function* sendPasswordResetEmail(action) {
  try {
    const response = yield call(auth.sendPasswordResetEmail, action.payload.email);

    if (action.meta && action.meta.nextAction) {
      yield put({
        ...action.meta.nextAction,
        payload: response,
      });
    } else {
      yield put({
        type: 'SET_SYSTEM_MESSAGE',
        payload: {
          message: 'Email sent successfully',
        },
        error: true,
      });
    }
  } catch (error) {
    yield put({
      type: 'SET_SYSTEM_MESSAGE',
      payload: utils.createError(error),
      error: true,
    });
  }
}
