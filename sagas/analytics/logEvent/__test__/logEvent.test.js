import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import utils from '../../../../utils';
import logEvent from '../';

const analytics = {
  logEvent: jest.fn(),
};

const action = {
  type: 'logEvent',
  payload: {
    event: 'test',
    params: {
      foo: 'bar',
    },
  },
  meta: {
    nextAction: {
      type: 'LOG_EVENT_SUCCESS',
    },
  },
};

describe('When testing the logEvent saga', () => {
  const it = sagaHelper(logEvent(action));

  it('should have called the mocked API first', (result) => {
    // JSON.stringify is necessary here otherwise our mock function and real function comparison
    // fail and we really don't care if they're not the same, we're just testing that
    // the correct calls and puts happen
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(call(analytics.logEvent, action.payload.event, action.payload.params)),
    );
  });

  it('and then trigger an action', (result) => {
    expect(result).toEqual(put({ ...action.meta.nextAction, payload: {} }));
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('When testing the logEvent saga for error', () => {
  const it = sagaHelper(logEvent(action));
  const errorMessage = 'Something went wrong';

  it('should have called the mocked API first', (result) => {
    // JSON.stringify is necessary here otherwise our mock function and real function comparison
    // fail and we really don't care if they're not the same, we're just testing that
    // the correct calls and puts happen
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(call(analytics.logEvent, action.payload.event, action.payload.params)),
    );

    return new Error(errorMessage);
  });

  it('and then trigger an error action with the error message', (result) => {
    expect(result).toEqual(
      put({
        type: 'SET_SYSTEM_MESSAGE',
        payload: utils.app.createError(new Error(errorMessage)),
        error: true,
      }),
    );
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});
