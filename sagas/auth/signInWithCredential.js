import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';
import utils from '../../utils';

export default function* signInWithCredential(action) {
  try {
    const response = yield call(auth.signInWithCredential, action.payload.credential);

    if (action.meta && action.meta.nextAction) {
      yield put({
        ...action.meta.nextAction,
        payload: response,
      });
    } else {
      yield put({
        type: 'SIGN_IN_USER',
        payload: response,
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
