import { call, put } from 'redux-saga/effects';
import { database } from '../../services';

export default function* pushData(action) {
  try {
    const response = yield call(database.pushData, action.payload.ref, action.payload.data);

    if (__DEV__) {
      console.log('pushData', response);
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
