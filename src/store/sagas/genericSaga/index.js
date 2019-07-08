import { call, put, all } from 'redux-saga/effects';

import onError from '../onError';
import prepareNextActions from '../prepareNextActions';
import { strings } from '../../../utils';

/*
  Generic saga:

  - Takes args as first argument { service, shouldTrackEvent }
  -- Service is injected into saga
  -- shouldTrackEvent is passed for event monitoring
  - Takes action as second argument
*/
export default function* genericSaga(args, action) {
  const { service, shouldTrackEvent } = args;

  try {
    const { payload } = action;
    const eventId = shouldTrackEvent && strings.createUID();

    // If shouldTrackEvent
    // Add a pendingTransaction to the store
    if (shouldTrackEvent) {
      yield put({
        type: 'ADD_PENDING_TRANSACTION',
        payload: { event: { action, id: eventId } },
      });
    }

    const response = yield call(service, payload);

    // If shouldTrackEvent
    // Remove this pendingTransaction from the store
    if (shouldTrackEvent) {
      yield put({
        type: 'REMOVE_PENDING_TRANSACTION',
        payload: {
          eventId,
        },
      });
    }

    // Prepare the next action
    // using the previous action's
    // and the response
    const nextActions = prepareNextActions(action, response);

    if (nextActions) {
      yield all(nextActions.map((nextAction) => put(nextAction)));
    }
  } catch (error) {
    yield onError(error);
  }
}
