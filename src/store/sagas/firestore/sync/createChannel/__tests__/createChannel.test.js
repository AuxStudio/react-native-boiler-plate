import { eventChannel } from 'redux-saga';

import createChannel from '..';

jest.mock('../../../../../services/', () => {
  return {
    firestore: {
      sync: jest.fn(),
    },
  };
});

describe('createChannel', () => {
  it('should work', () => {
    expect(JSON.stringify(createChannel())).toEqual(
      JSON.stringify(
        eventChannel(() => {
          return () => {}; // unsubscribe function is required
        }),
      ),
    );
  });
});
