import { call, put, all } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { auth } from '../../services';

export default function* linkUserWithCredential(action) {
  try {
    if (firebase.auth().currentUser) {
      const { payload } = yield call(auth.linkUserWithCredential, action);

      if (__DEV__) {
        console.log('linkUserWithCredential', payload);
      }

      yield all([
        put({
          type: 'updateData',
          payload,
          meta: {
            node: `users/ ${payload.message.uid}`,
          },
        }),
        put({
          type: 'SIGN_IN_USER',
          payload,
        }),
      ]);
    } else {
      // TODO: missing try catch?
      // sign in anonymously
      const { payload } = yield call(auth.signInUserAnonymously, action);

      if (__DEV__) {
        console.log('signInUserAnonymously', payload);
      }

      yield put({
        type: 'linkUserWithCredential',
        payload,
      });
    }
  } catch (error) {
    if (
      error.message === 'auth/credential-already-in-use' ||
      error.message === 'auth/email-already-in-use'
    ) {
      // Sign in with provider instead
      yield put({
        type: 'signInUserWithCredential',
        credential: action.credential,
      });
    } else {
      yield put({
        type: 'SET_MESSAGE',
        payload: new Error(error),
        error: true,
      });
    }
  }
}
