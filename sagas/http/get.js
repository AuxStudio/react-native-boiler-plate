import { call, put } from 'redux-saga/effects';
import { http } from '../../services';
import utils from '../../utils';

export default function* get(action) {
  try {
    const response = yield call(http.get, action.payload.url);

    if (action.meta && action.meta.nextAction) {
      yield put({
        ...action.meta.nextAction,
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
