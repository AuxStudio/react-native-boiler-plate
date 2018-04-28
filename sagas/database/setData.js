import { call, put } from 'redux-saga/effects';

import database from '../../services/database';

export default function* setData(action) {
  try {
    const { payload, error } = yield call(database.setData);

    if (__DEV__) {
      console.log('setData', payload);
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
