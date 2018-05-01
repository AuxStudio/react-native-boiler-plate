import { call, put } from 'redux-saga/effects';
import { auth } from '../../services';
import utils from '../../utils';

export default function* getAuth(action) {
  try {
    const response = yield call(auth.getAuth);

    if (response) {
      if (action.meta.nextAction) {
        yield put({
          ...action.meta.nextAction,
          payload: response,
        });
      }
    } else {
      yield put({
        type: 'signInAnonymously',
      });
    }
  } catch (error) {
    yield put({
      type: 'SET_SYSTEM_MESSAGE',
      payload: utils.createError(error),
      error: true,
    });
  }
}
