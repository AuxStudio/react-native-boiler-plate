import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';

export default function* getCredentialAndSignIn(action) {
  try {
    const service = `getCredentialFrom${action.payload.provider}`;
    const getCredentialResponse = yield call(
      auth[service],
      action.payload.email,
      action.payload.password,
    ); // NOTE: only getCredentialFromEmail is expecting these: args[1], args[2]

    if (__DEV__) {
      console.log(service, getCredentialResponse);
    }

    if (getCredentialResponse) {
      try {
        const signInWithCredentialResponse = yield call(
          auth.signInWithCredential,
          getCredentialResponse, // the credential
        );

        if (__DEV__) {
          console.log('signInWithCredential', signInWithCredentialResponse);
        }

        if (action.nextAction) {
          yield put({
            ...action.nextAction,
            payload: getCredentialResponse,
          });
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
  } catch (error) {
    const payload = error instanceof Error ? error : new Error(error);

    yield put({
      type: 'SET_SYSTEM_MESSAGE',
      payload,
      error: true,
    });
  }
}
