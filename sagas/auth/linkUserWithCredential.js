import { call, put, all } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { auth } from '../../services';

export default function* linkUserWithCredential(action) {
  try {
    if (firebase.auth().currentUser) {
      const { payload, error } = yield call(auth.linkUserWithCredential, action);

      if (__DEV__) {
        console.log('linkUserWithCredential', payload);
      }

      if (error) {
        if (
          payload.message === 'auth/credential-already-in-use' ||
          payload.message === 'auth/email-already-in-use'
        ) {
          // Sign in with provider instead
          yield put({
            type: 'signInUserWithCredential',
            credential: action.credential,
          });
        } else {
          yield put({
            type: 'SET_MESSAGE',
            payload: new Error(payload),
            error: true,
          });
        }
      } else {
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
      }
    } else {
      // sign in anonymously
      const { payload, error } = yield call(auth.signInUserAnonymously, action);

      if (__DEV__) {
        console.log('signInUserAnonymously', payload);
      }

      if (error) {
        yield put({
          type: 'SET_MESSAGE',
          payload: new Error(payload),
          error: true,
        });
      } else {
        yield put({
          type: 'linkUserWithCredential',
          payload,
        });
      }
    }
  } catch (error) {
    yield put({
      type: 'SET_MESSAGE',
      payload: new Error(error),
      error: true,
    });
  }
}
