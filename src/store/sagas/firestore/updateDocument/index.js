import { call, put } from 'redux-saga/effects';

import { firestore } from '../../../../services';
import { app, strings } from '../../../../utils';

export default function* updateDocument(action) {
  try {
    const writeEventID = strings.createUID();

    yield put({
      type: 'ADD_PENDING_TRANSACTION',
      payload: {
        event: {
          id: writeEventID,
          action,
        },
      },
    });

    const response = yield call(
      firestore.updateDocument,
      action.meta.pathParts,
      action.payload.document,
    );

    yield put({
      type: 'REMOVE_PENDING_TRANSACTION',
      payload: {
        id: writeEventID,
      },
    });

    const nextAction = app.prepareNextAction(action, response);

    if (nextAction) {
      yield put(nextAction);
    }
  } catch (error) {
    yield put({
      type: 'logError',
      payload: {
        error: app.createError(error),
        date: Date.now(),
        action,
      },
    });
  }
}
