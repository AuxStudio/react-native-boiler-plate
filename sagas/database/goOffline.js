import { call, put } from 'redux-saga/effects';
import { database } from '../../services';
import utils from '../../utils';

export default function* goOffline(action) {
  try {
    const response = yield call(database.goOffline);
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
