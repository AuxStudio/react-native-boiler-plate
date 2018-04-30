// COUPLED SAGA
import { call, put } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { auth } from '../../services';

export default function* linkUserWithCredential(action) {
  try {
    if (firebase.auth().currentUser) {
      const response = yield call(auth.linkUserWithCredential, action);

      if (__DEV__) {
        console.log('linkUserWithCredential', response);
      }

      // TODO: yield next actions if there
    } else {
      // User is logged out and needs to sign in again
      try {
        const response = yield call(auth.signInUserAnonymously, action);

        if (__DEV__) {
          console.log('signInUserAnonymously', response);
        }

        yield put({
          type: 'linkUserWithCredential',
          payload: response,
        });
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
    if (
      error.message === 'auth/credential-already-in-use' ||
      error.message === 'auth/email-already-in-use'
    ) {
      // Sign in with provider instead
      yield put({
        type: 'signInUserWithCredential',
        payload: action.payload.credential,
      });
    } else {
      const payload = error instanceof Error ? error : new Error(error);

      yield put({
        type: 'SET_SYSTEM_MESSAGE',
        payload,
        error: true,
      });
    }
  }
}
