import { call, put } from 'redux-saga/effects';
import { images } from '../../services';

export default function* showImagePicker(action) {
  try {
    const { payload } = yield call(images.showImagePicker);
    if (__DEV__) {
      console.log('showImagePicker', payload);
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
