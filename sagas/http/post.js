import { call, put } from 'redux-saga/effects';
import { http } from '../../services';

export default function* post(action) {
  try {
    const response = yield call(
      http.post,
      action.payload.url,
      action.payload.headers,
      action.payload.data,
    );

    if (__DEV__) {
      console.log('get', response);
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
