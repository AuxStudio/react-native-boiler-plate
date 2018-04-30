import { call, put } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { auth } from '../services';

export function* getUserAuth(action) {
  try {
    const response = yield call(auth.getUserAuth);

    if (__DEV__) {
      console.log('getUserAuth', response);
    }

    if (response) {
      if (action.nextAction) {
        yield put({
          ...action.nextAction,
          payload: response,
        });
      }
    } else {
      yield put({
        type: 'signInUserAnonymously',
      });
    }
  } catch (error) {
    yield put({
      type: 'SET_MESSAGE',
      payload: new Error(error),
      error: true,
    });
  }
}

export function* getUserCredentialFromEmail(action) {
  try {
    const response = yield call(auth.getUserCredentialFromEmail);

    if (__DEV__) {
      console.log('getUserCredentialFromEmail', response);
    }

    if (action.nextAction) {
      yield put({
        ...action.nextAction,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: 'SET_MESSAGE',
      payload: new Error(error),
      error: true,
    });
  }
}

export function* getUserCredentialFromFacebook(action) {
  try {
    const response = yield call(auth.getUserCredentialFromFacebook);

    if (__DEV__) {
      console.log('getUserCredentialFromFacebook', response);
    }

    if (action.nextAction) {
      yield put({
        ...action.nextAction,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: 'SET_MESSAGE',
      payload: new Error(error),
      error: true,
    });
  }
}

export function* getUserCredentialFromGoogle(action) {
  try {
    const response = yield call(auth.getUserCredentialFromGoogle);

    if (__DEV__) {
      console.log('getUserCredentialFromGoogle', response);
    }

    if (action.nextAction) {
      yield put({
        ...action.nextAction,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: 'SET_MESSAGE',
      payload: new Error(error),
      error: true,
    });
  }
}

export function* linkUserWithCredential(action) {
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
        yield put({
          type: 'SET_MESSAGE',
          payload: new Error(error),
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
      yield put({
        type: 'SET_MESSAGE',
        payload: new Error(error),
        error: true,
      });
    }
  }
}

export function* sendPasswordResetEmail(action) {
  try {
    const response = yield call(auth.sendPasswordResetEmail, action);

    if (response) {
      if (action.nextAction) {
        yield put({
          ...action.nextAction,
          payload: response,
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

export function* signInUserAnonymously(action) {
  try {
    const response = yield call(auth.signInUserAnonymously);

    if (__DEV__) {
      console.log('signInUserAnonymously', response);
    }

    if (action.nextAction) {
      yield put({
        ...action.nextAction,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: 'SET_MESSAGE',
      payload: new Error(error),
      error: true,
    });
  }
}

export function* signInUserWithCredential(action) {
  try {
    const response = yield call(auth.signInUserWithCredential, action);

    if (__DEV__) {
      console.log('signInUserWithCredentialResponse', response);
    }

    if (action.nextAction) {
      yield put({
        ...action.nextAction,
        payload: response,
      });
    }
  } catch (error) {
    if (error.message.code === 'auth/account-exists-with-different-credential') {
      yield put({
        type: 'SET_MESSAGE',
        payload: new Error(
          "Hello! You've already signed in with someone else. Please try another option.",
        ),
        error: true,
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
