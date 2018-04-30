import { call, put } from 'redux-saga/effects';
import { storage } from '../../services';

export default function* uploadFile(action) {
  try {
    const response = yield call(storage.uploadFile);
    if (__DEV__) {
      console.log('uploadFile', response);
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
