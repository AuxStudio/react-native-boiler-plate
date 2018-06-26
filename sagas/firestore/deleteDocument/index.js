import { call, put } from 'redux-saga/effects';

import { firestore } from '../../../services';
import utils from '../../../utils';

export default function* deleteDocument(action) {
  try {
    const response = yield call(firestore.deleteDocument, action.meta.pathParts);
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
