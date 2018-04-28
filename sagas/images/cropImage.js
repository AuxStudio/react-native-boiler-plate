import { call, put } from 'redux-saga/effects';
import { images } from '../../services';

export default function* cropImage(action) {
  try {
    const { payload } = yield call(images.cropImage);
    if (__DEV__) {
      console.log('cropImage', payload);
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
