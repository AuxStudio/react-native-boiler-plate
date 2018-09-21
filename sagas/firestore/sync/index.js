import { call, take, put } from 'redux-saga/effects';

import utils from '../../../utils';
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

      const nextAction = utils.app.prepareNextAction(action, { data });

      if (nextAction) {
        yield put(nextAction);
      }
    }
  } catch (error) {
    yield put({
      type: 'logError',
      payload: {
        error: utils.app.createError(error),
        date: Date.now(),
      },
    });
  }
}
