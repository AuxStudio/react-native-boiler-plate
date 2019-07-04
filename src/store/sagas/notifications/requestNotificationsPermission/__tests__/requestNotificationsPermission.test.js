import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import { app } from '../../../../../utils';
import requestNotificationsPermission from '..';

const notifications = {
  requestNotificationsPermission: jest.fn(),
};

const action = {
  type: 'requestNotificationsPermission',
};

const nextAction = {
  type: 'SUCCESS',
};

const actionWithNextAction = { ...action, meta: { ...action.meta, nextAction } };

const response = { foo: 'bar' };

describe('When testing the saga without a nextAction and without a response from the api', () => {
  const it = sagaHelper(requestNotificationsPermission(action));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(call(notifications.requestNotificationsPermission)),
    );
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('When testing the saga without a nextAction and with a response from the api', () => {
  const it = sagaHelper(requestNotificationsPermission(action));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(call(notifications.requestNotificationsPermission)),
    );

    return response;
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('When testing the saga with a nextAction and without a response from the api', () => {
  const it = sagaHelper(requestNotificationsPermission(actionWithNextAction));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(call(notifications.requestNotificationsPermission)),
    );
  });

  it('and then trigger an action', (result) => {
    expect(result).toEqual(put({ ...nextAction, payload: {} }));
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('When testing the saga with a nextAction and with a response from the api', () => {
  const it = sagaHelper(requestNotificationsPermission(actionWithNextAction));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(call(notifications.requestNotificationsPermission)),
    );

    return response;
  });

  it('and then trigger an action', (result) => {
    expect(result).toEqual(put({ ...nextAction, payload: response }));
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('When testing the saga when an error is thrown from the api', () => {
  const it = sagaHelper(requestNotificationsPermission(action));
  const errorMessage = 'Something went wrong';

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(call(notifications.requestNotificationsPermission)),
    );

    return new Error(errorMessage);
  });

  it('and then trigger an error action with the error message', (result) => {
    expect(result).toEqual(
      put({
        type: 'logError',
        payload: {
          error: app.createError(errorMessage),
          date: expect.any(Number),
        },
      }),
    );
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});
