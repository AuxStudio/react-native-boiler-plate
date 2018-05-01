import { call, put } from 'redux-saga/effects';
import { storage } from '../../services';

export default function* uploadFile(action) {
  try {
    const response = yield call(storage.uploadFile, action.payload.ref, action.payload.filePath);

    if (__DEV__) {
      console.log('uploadFile', response);
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
