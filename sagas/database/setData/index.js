import { call, put } from 'redux-saga/effects';

import { database } from '../../../services';
import utils from '../../../utils';

export default function* setData(action) {
  try {
    const response = yield call(database.setData, action.payload.ref, action.payload.data);
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
