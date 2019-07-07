import { eventChannel } from 'redux-saga';

export default function createChannel({ service, payload }) {
  return eventChannel((emit) => {
    service(payload, emit);

    // The subscriber must return an unsubscribe function
    return () => {};
  });
}
