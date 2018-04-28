import { call, put } from 'redux-saga/effects';
import { images } from '../../services';

export default function* resizeImage(action) {
  try {
    const { payload, error } = yield call(images.resizeImage);
    if (__DEV__) {
      console.log('resizeImage', payload);
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
