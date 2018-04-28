import { call, put } from 'redux-saga/effects';
import { database } from '../../services';

export default function* updateData(action) {
  try {
    const { payload, error } = yield call(database.updateData);

    if (__DEV__) {
      console.log('updateData', payload);
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
