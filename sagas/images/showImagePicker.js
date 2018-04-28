import { call, put } from 'redux-saga/effects';
import { images } from '../../services';

export default function* showImagePicker(action) {
  try {
    const { payload, error } = yield call(images.showImagePicker);
    if (__DEV__) {
      console.log('showImagePicker', payload);
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
