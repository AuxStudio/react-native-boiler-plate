import { call, put } from 'redux-saga/effects';
import { database } from '../../services';

export default function* getData(action) {
  try {
    const response = yield call(database.getData);

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
    yield put({
      type: 'SET_MESSAGE',
      payload: new Error(error),
      error: true,
    });
  }
}
