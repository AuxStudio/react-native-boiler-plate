import { call, put } from 'redux-saga/effects';

import { firestore } from '../../../services';
import utils from '../../../utils';

export default function* getCollection(action) {
  try {
    const response = yield call(firestore.getCollection, action.meta.pathParts);
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
