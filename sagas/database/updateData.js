import { call, put } from 'redux-saga/effects';
import { database } from '../../services';

export default function* updateData(action) {
  try {
    const response = yield call(database.updateData);

    if (__DEV__) {
      console.log('updateData', response);
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
