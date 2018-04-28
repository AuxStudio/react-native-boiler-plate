import { call, put } from 'redux-saga/effects';
import { images } from '../../services';

export default function* resizeImage(action) {
  try {
    const response = yield call(images.resizeImage);

    if (__DEV__) {
      console.log('resizeImage', response);
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
