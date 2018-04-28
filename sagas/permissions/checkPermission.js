import { call, put } from 'redux-saga/effects';
import { permissions } from '../../services';

export default function* checkPermission(action) {
  try {
    const { payload, error } = yield call(permissions.checkPermission);
    if (__DEV__) {
      console.log('checkPermission', payload);
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
