import { call, put } from 'redux-saga/effects';
import { analytics } from '../../services';

export default function* logEvent(action) {
  try {
    const response = yield call(analytics.logEvent, action);

    if (__DEV__) {
      console.log('logEvent', response);
    }

    if (action.nextAction) {
      yield put({
        ...action.nextAction,
        payload: response,
      });
    }
  } catch (error) {
    const payload = error instanceof Error ? error : new Error(error);

    yield put({
      type: 'SET_SYSTEM_MESSAGE',
      payload,
      error: true,
    });
  }
}
