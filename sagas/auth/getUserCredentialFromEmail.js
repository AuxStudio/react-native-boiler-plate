import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';

export default function* getUserCredentialFromEmail(action) {
  try {
    const response = yield call(auth.getUserCredentialFromEmail, action);

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
      type: 'SET_SYSTEM_MESSAGE',
      payload: new Error(error),
      error: true,
    });
  }
}
