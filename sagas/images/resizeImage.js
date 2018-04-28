import { call, put } from 'redux-saga/effects';
import { images } from '../../services';

export default function* resizeImage(action) {
  try {
    const { payload } = yield call(images.resizeImage);
    if (__DEV__) {
      console.log('resizeImage', payload);
    }

    if (action.nextAction) {
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
