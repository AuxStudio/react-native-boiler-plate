import { call, put } from 'redux-saga/effects';
import { database } from '../services';

export function* getData(action) {
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

export function* pushData(action) {
  try {
    const response = yield call(database.pushData);

    if (__DEV__) {
      console.log('pushData', response);
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

export function* setData(action) {
  try {
    const response = yield call(database.setData);

    if (__DEV__) {
      console.log('setData', response);
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

export function* updateData(action) {
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
