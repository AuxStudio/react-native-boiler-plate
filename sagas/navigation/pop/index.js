import { call, put } from 'redux-saga/effects';

import { navigation } from '../../../services';
import utils from '../../../utils';

export default function* pop(action) {
  try {
    const response = yield call(navigation.pop);
    const nextAction = utils.app.prepareNextAction(action, response);

    yield put({
      type: 'POP_PAGE',
    });

    if (nextAction) {
      yield put(nextAction);
    }
  } catch (error) {
    yield put({
      type: 'logError',
      payload: {
        error: utils.app.createError(error),
        date: new Date(),
      },
    });
  }
}
