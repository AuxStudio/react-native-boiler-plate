import { call, put } from 'redux-saga/effects';
import { http } from '../../services';
import utils from '../../utils';

export default function* post(action) {
  try {
    const response = yield call(
      http.post,
      action.payload.url,
      action.payload.headers,
      action.payload.body,
    );

    if (action.nextAction) {
      yield put({
        ...action.nextAction,
        payload: response,
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
