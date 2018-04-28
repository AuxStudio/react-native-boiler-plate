import { call, put } from 'redux-saga/effects';
import { http } from '../../services';

export default function* get(action) {
  try {
    const { payload } = yield call(http.get);

    if (__DEV__) {
      console.log('get', payload);
    }

    if (action.nextAction) {
      yield put({
        ...action.nextAction,
        payload,
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
