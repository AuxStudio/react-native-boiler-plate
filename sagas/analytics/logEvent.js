import { call, put } from 'redux-saga/effects';
import { analytics } from '../../services';

export default function* logEvent(action) {
  try {
    const { payload } = yield call(analytics.logEvent);

    if (__DEV__) {
      console.log('logEvent', payload);
    }

    if (action.nextAction) {
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
