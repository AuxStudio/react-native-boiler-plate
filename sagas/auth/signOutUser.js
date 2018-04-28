import { call, put } from 'redux-saga';
import { auth } from '../../services';

export default function* signOutUser(action) {
  try {
    const response = yield call(auth.signOutUser);

    if (__DEV__) {
      console.log('signOutUserResponse', response);
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
