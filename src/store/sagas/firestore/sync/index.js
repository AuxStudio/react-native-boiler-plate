import { call, take, put } from 'redux-saga/effects';

import { app } from '../../../../utils';
import createChannel from './createChannel';

export default function* sync(action) {
  const channel = yield call(createChannel, action.meta.pathParts, action.meta.query);

  try {
    while (true) {
      const response = yield take(channel);

      // Parse the response into data only
      let data;

      try {
        // is document
        data = response.data();
      } catch (error) {
        // is collection
        data = response.docs.map((document) => {
          return {
            ...document.data(),
            id: document.id,
          };
        });
      }

      const nextAction = app.prepareNextAction(action, { data });

      if (nextAction) {
        yield put(nextAction);
      }
    }
  } catch (error) {
    yield put({
      type: 'logError',
      payload: {
        error: app.createError(error),
        date: Date.now(),
      },
    });
  }
}
