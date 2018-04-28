import { call, put } from 'redux-saga/effects';
import { database } from '../../services';

export default function* getData(action) {
  try {
    const { payload, error } = yield call(database.getData);

    if (__DEV__) {
      console.log('getData', payload);
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
