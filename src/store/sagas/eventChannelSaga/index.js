import { call, put, take, takeEvery, all } from 'redux-saga/effects';

import createChannel from './createChannel';
import onError from '../onError';
import prepareNextActions from '../prepareNextActions';
import { strings } from '../../../utils';

/*
  Event Channel saga:

  - Takes args as first argument { service, shouldTrackEvent }
  -- Service is injected into saga
  -- shouldTrackEvent is passed for event monitoring
  -- It will `take` responses
  - Takes action as second argument
*/
export default function* eventChannelSaga(args, action) {
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

    // Get the response
    // If its an event channel
    // Create a while loop and take responses
    // Else just assign the response
    const channel = yield call(createChannel, { service, payload });

    yield takeEvery(channel, function* listen(response) {
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

      if (response.error) {
        yield onError(response.error);
      } else {
        const nextActions = prepareNextActions(action, response);

        if (nextActions) {
          yield all(nextActions.map((nextAction) => put(nextAction)));
        }
      }
    });

    yield take('CANCEL_SYNC');

    channel.close();
  } catch (error) {
    yield onError(error);
  }
}
