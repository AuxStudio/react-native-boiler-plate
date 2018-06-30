import { call, take, put } from 'redux-saga/effects';

import utils from '../../../utils';
import createChannel from './createChannel';

export default function* sync(action) {
  const channel = yield call(createChannel, action.meta.pathParts);

  try {
    while (true) {
      const response = yield take(channel);
      const nextAction = utils.app.prepareNextAction(action, response);

      if (nextAction) {
        yield put(nextAction);
      }
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
