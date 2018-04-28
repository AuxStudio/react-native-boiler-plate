import { call, put } from 'redux-saga/effects';
import { analytics } from '../../services';

export default function* logEvent(action) {
  try {
    const { payload, error } = yield call(analytics.logEvent);

    if (__DEV__) {
      console.log('logEvent', payload);
    }

    if (error) {
      yield put({
        type: 'SET_MESSAGE',
        payload: new Error(payload),
        error: true,
      });
    } else if (action.nextAction) {
      yield put({
        ...action.nextAction,
        payload,
      });
    }
  } catch (error) {
    yield put({
      type: 'SET_MESSAGE',
      payload: new Error(error),
      error: true,
    });
  }
}
