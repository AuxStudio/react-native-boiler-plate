import { call, put } from 'redux-saga/effects';
import { images } from '../../services';

export default function* cropImage(action) {
  try {
    const response = yield call(images.cropImage);

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
    yield put({
      type: 'SET_MESSAGE',
      payload: new Error(error),
      error: true,
    });
  }
}
