import { call, put } from 'redux-saga/effects';
import { images } from '../../services';
import utils from '../../utils';

export default function* showImagePicker(action) {
  try {
    const response = yield call(images.showImagePicker);

    if (action.meta && action.meta.nextAction) {
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
