import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';
import utils from '../../utils';

export default function* signInAnonymously(action) {
  try {
    const response = yield call(auth.signInAnonymously);
    const { user } = response; // omits additionalUserInfo

    if (action.meta && action.meta.nextAction) {
      yield put({
        ...action.meta.nextAction,
        payload: user,
      });
    } else {
      yield put({
        type: 'SIGN_IN_USER',
        payload: user,
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
