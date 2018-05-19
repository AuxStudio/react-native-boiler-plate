import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';
import utils from '../../utils';

export default function* signInAnonymously(action) {
  try {
    const response = yield call(auth.signInAnonymously);
    const { user } = response; // omits additionalUserInfo
    const nextAction = utils.prepareNextAction(action, response);

    if (nextAction) {
      yield put(nextAction);
    } else if (user) {
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
