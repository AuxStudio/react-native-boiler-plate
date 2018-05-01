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
    ); // NOTE: only getCredentialFromEmail is expecting these: args[1], args[2]

    if (getCredentialResponse) {
      try {
        yield call(
          auth.signInWithCredential,
          getCredentialResponse, // the credential
        );

        if (action.nextAction) {
          yield put({
            ...action.nextAction,
            payload: getCredentialResponse,
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
  } catch (error) {
    yield put({
      type: 'SET_SYSTEM_MESSAGE',
      payload: utils.createError(error),
      error: true,
    });
  }
}
