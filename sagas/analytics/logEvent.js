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
    yield put({
      type: 'SET_MESSAGE',
      payload: new Error(error),
      error: true,
    });
  }
}
