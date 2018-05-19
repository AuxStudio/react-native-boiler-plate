import { call, put } from 'redux-saga/effects';
import { images } from '../../services';
import utils from '../../utils';

export default function* resizeImage(action) {
  try {
    const response = yield call(images.resizeImage, action.payload.uri);
    const nextAction = utils.prepareNextAction(action, response);

    if (nextAction) {
      yield put(nextAction);
    }
  } catch (error) {
    yield put({
      type: 'SET_SYSTEM_MESSAGE',
      payload: utils.createError(error),
      error: true,
    });
  }
}
