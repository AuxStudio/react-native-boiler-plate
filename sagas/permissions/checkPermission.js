import { call, put } from 'redux-saga/effects';
import { permissions } from '../../services';

export default function* checkPermission(action) {
  try {
    const response = yield call(permissions.checkPermission, action.payload.permission);

    if (__DEV__) {
      console.log('checkPermission', response);
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
