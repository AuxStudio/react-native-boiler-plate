import { call, put } from 'redux-saga/effects';
import { images } from '../../services';

export default function* cropImage(action) {
  try {
    const response = yield call(images.cropImage, action);

    if (__DEV__) {
      console.log('cropImage', response);
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
