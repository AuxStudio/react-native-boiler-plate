import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';

export default function* getCredentialFromGoogle(action) {
  try {
    const response = yield call(auth.getCredentialFromGoogle);

    if (__DEV__) {
      console.log('getCredentialFromGoogle', response);
    }

    if (action.nextAction) {
      yield put({
        ...action.nextAction,
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
