import { call, put } from 'redux-saga/effects';
import { http } from '../../../services';
import utils from '../../../utils';

export default function* get(action) {
  try {
    const response = yield call(http.get, action.payload.url);
    const nextAction = utils.app.prepareNextAction(action, response);

    if (nextAction) {
      yield put(nextAction);
    }
  } catch (error) {
    yield put({
      type: 'logError',
      payload: {
        error: utils.app.createError(error),
        date: Date.now(),
        action,
      },
    });
  }
}
