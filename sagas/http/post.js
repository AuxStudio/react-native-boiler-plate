import { call, put } from 'redux-saga/effects';

import http from '../../services/http';

export default function* get(action) {
  try {
    const { payload, error } = yield call(http.get);

    if (__DEV__) {
      console.log('get', payload);
    }

    if (error) {
      yield put({
        type: 'SET_MESSAGE',
        payload: new Error(payload),
        error: true,
      });
    } else if (action.nextAction) {
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
