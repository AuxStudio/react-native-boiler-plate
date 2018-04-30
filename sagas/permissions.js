import { call, put } from 'redux-saga/effects';
import { permissions } from '../services';

export function* checkPermission(action) {
  try {
    const response = yield call(permissions.checkPermission);

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
    yield put({
      type: 'SET_MESSAGE',
      payload: new Error(error),
      error: true,
    });
  }
}

export function* requestPermission(action) {
  try {
    const response = yield call(permissions.requestPermission);

    if (__DEV__) {
      console.log('requestPermission', response);
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
