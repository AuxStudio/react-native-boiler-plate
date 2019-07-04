import { call, put } from 'redux-saga/effects';

import { auth } from '../../../services';
import utils from '../../../utils';

export default function* getCredentialAndSignIn(action) {
  try {
    const service = `getCredentialFrom${action.payload.provider}`;
    let getCredentialResponse;

    if (action.payload.provider === 'Email') {
      getCredentialResponse = yield call(
        auth.getCredentialFromEmail,
        action.payload.email,
        action.payload.password,
      );
    } else {
      getCredentialResponse = yield call(auth[service]);
    }

    try {
      const signInWithCredentialResponse = yield call(
        auth.signInWithCredential,
        getCredentialResponse.credential,
      );
      const nextAction = utils.app.prepareNextAction(action, signInWithCredentialResponse);

      if (nextAction) {
        yield put(nextAction);
      } else if (signInWithCredentialResponse) {
        yield put({
          type: 'SIGN_IN_USER',
          payload: signInWithCredentialResponse,
        });
      }
    } catch (error) {
      yield put({
        type: 'logError',
        payload: {
          error: utils.app.createError(error),
          date: Date.now(),
          action,
        },
      });
    }
  } catch (error) {
    yield put({
      type: 'logError',
      payload: {
        error: utils.app.createError(error),
        date: Date.now(),
        action,
      },
    });
  }
}
