import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';

export default function* getUserCredentialFromFacebook(action) {
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
