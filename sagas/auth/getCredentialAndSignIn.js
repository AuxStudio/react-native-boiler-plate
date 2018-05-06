import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';
import utils from '../../utils';

export default function* getCredentialAndSignIn(action) {
  try {
    const service = `getCredentialFrom${action.payload.provider}`;
    const getCredentialResponse = yield call(
      auth[service],
      action.payload.email,
      action.payload.password,
    ); // NOTE: only getCredentialFromEmail is expecting email and password

    try {
      const signInWithCredentialResponse = yield call(
        auth.signInWithCredential,
        getCredentialResponse, // the credential
      );

      if (action.meta.nextAction) {
        yield put({
          ...action.meta.nextAction,
          payload: getCredentialResponse,
        });
      } else {
        yield put({
          type: 'SIGN_IN_USER',
          payload: signInWithCredentialResponse,
        });
      }
    } catch (error) {
      yield put({
        type: 'SET_SYSTEM_MESSAGE',
        payload: utils.createError(error),
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
