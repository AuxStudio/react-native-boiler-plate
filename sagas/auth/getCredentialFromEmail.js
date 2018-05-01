import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';

export default function* getCredentialFromEmail(action) {
  try {
    const response = yield call(
      auth.getCredentialFromEmail,
      action.payload.email,
      action.payload.password,
    );

    if (__DEV__) {
      console.log('getCredentialFromEmail', response);
    }

    if (action.meta.nextAction) {
      yield put({
        ...action.meta.nextAction,
        payload: response,
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
