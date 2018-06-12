import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import utils from '../../../../utils';
import post from '../';

const http = {
  post: jest.fn(),
};

const action = {
  type: 'post',
  payload: {
    url: 'https://google.com',
    headers: true,
    body: true,
  },
};

const nextAction = {
  type: 'SUCCESS',
};

const actionWithNextAction = { ...action, meta: { nextAction } };

const response = { foo: 'bar' };

describe('When testing the saga without a nextAction and without a response from the api', () => {
  const it = sagaHelper(post(action));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(
        call(http.post, action.payload.url, action.payload.headers, action.payload.body),
      ),
    );
  });

  // Insert test for default nextAction (if any)

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('When testing the saga without a nextAction and with a response from the api', () => {
  const it = sagaHelper(post(action));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(
        call(http.post, action.payload.url, action.payload.headers, action.payload.body),
      ),
    );

    return response;
  });

  // Insert test for default nextAction (if any)

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('When testing the saga with a nextAction and without a response from the api', () => {
  const it = sagaHelper(post(actionWithNextAction));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(
        call(http.post, action.payload.url, action.payload.headers, action.payload.body),
      ),
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
  const it = sagaHelper(post(actionWithNextAction));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(
        call(http.post, action.payload.url, action.payload.headers, action.payload.body),
      ),
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
  const it = sagaHelper(post(action));
  const errorMessage = 'Something went wrong';

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(
        call(http.post, action.payload.url, action.payload.headers, action.payload.body),
      ),
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
