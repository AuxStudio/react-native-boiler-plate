import { call, put } from 'redux-saga/effects';
import { analytics } from '../../services';

export default function* logEvent(action) {
  try {
    const response = yield call(analytics.logEvent, action.payload.event, action.payload.params);

    if (__DEV__) {
      console.log('logEvent', response);
    }

    if (action.meta.nextAction) {
      yield put({
        ...action.meta.nextAction,
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
