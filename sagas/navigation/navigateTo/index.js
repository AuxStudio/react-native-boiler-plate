import { call, put } from 'redux-saga/effects';

import { navigation } from '../../../services';
import utils from '../../../utils';

export default function* navigateTo(action) {
  try {
    const response = yield call(
      navigation.navigateTo,
      action.payload.page,
      action.payload.props,
      action.payload.shouldReset,
      action.payload.shouldReplace,
    );
    const nextAction = utils.app.prepareNextAction(action, response);

    if (action.payload.shouldReset) {
      yield put({
        type: 'RESET_PAGES',
        payload: {
          page: action.payload.page,
        },
      });
    } else if (action.payload.shouldReplace) {
      yield put({
        type: 'REPLACE_PAGE',
        payload: {
          page: action.payload.page,
        },
      });
    } else {
      yield put({
        type: 'PUSH_PAGE',
        payload: {
          page: action.payload.page,
        },
      });
    }

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
