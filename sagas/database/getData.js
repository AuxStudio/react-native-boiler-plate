import { call, put } from 'redux-saga/effects';
import { database } from '../../services';

export default function* getData(action) {
  try {
    const response = yield call(database.getData, action.payload.ref);

    if (__DEV__) {
      console.log('getData', response);
    }

    if (action.nextAction) {
      yield put({
        ...action.nextAction,
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
