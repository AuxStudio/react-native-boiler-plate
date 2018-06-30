import { call, put } from 'redux-saga/effects';

import { database } from '../../../services';
import utils from '../../../utils';

export default function* getData(action) {
  try {
    const response = yield call(database.getData, action.payload.ref);
    const nextAction = utils.app.prepareNextAction(action, response);

    if (nextAction) {
      yield put(nextAction);
    }
  } catch (error) {
    yield put({
      type: 'logError',
      payload: {
        error: utils.app.createError(error),
        date: new Date(),
        action,
      },
    });
  }
}
