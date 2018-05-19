import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';
import utils from '../../utils';

export default function* getCredentialFromEmail(action) {
  try {
    const response = yield call(
      auth.getCredentialFromEmail,
      action.payload.email,
      action.payload.password,
    );
    const nextAction = utils.prepareNextAction(action, response);

    if (nextAction) {
      yield put(nextAction);
    } else if (response) {
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
