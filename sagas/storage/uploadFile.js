import { call, put } from 'redux-saga/effects';
import { storage } from '../../services';
import utils from '../../utils';

export default function* uploadFile(action) {
  try {
    const response = yield call(storage.uploadFile, action.payload.ref, action.payload.filePath);

    if (action.meta.nextAction) {
      yield put({
        ...action.meta.nextAction,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: 'SET_SYSTEM_MESSAGE',
      payload: utils.createError(error),
      error: true,
    });
  }
}
