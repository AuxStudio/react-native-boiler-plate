import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import utils from '../../../../utils';
import get from '..';

const http = {
  get: jest.fn(),
};

const action = {
  type: 'get',
  payload: {
    url: 'https://google.com',
  },
};

const nextAction = {
  type: 'SUCCESS',
};

const actionWithNextAction = { ...action, meta: { nextAction } };

const response = { foo: 'bar' };

describe('get saga', () => {
  describe('When testing the saga without a nextAction and without a response from the api', () => {
    const it = sagaHelper(get(action));

    it('should have called the mocked API first', (result) => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(http.get, action.payload.url)));
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('When testing the saga without a nextAction and with a response from the api', () => {
    const it = sagaHelper(get(action));

    it('should have called the mocked API first', (result) => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(http.get, action.payload.url)));

      return response;
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('When testing the saga with a nextAction and without a response from the api', () => {
    const it = sagaHelper(get(actionWithNextAction));

    it('should have called the mocked API first', (result) => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(http.get, action.payload.url)));
    });

    it('and then trigger an action', (result) => {
      expect(result).toEqual(put({ ...nextAction, payload: {} }));
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('When testing the saga with a nextAction and with a response from the api', () => {
    const it = sagaHelper(get(actionWithNextAction));

    it('should have called the mocked API first', (result) => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(http.get, action.payload.url)));

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
    const it = sagaHelper(get(action));
    const errorMessage = 'Something went wrong';

    it('should have called the mocked API first', (result) => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(http.get, action.payload.url)));

      return new Error(errorMessage);
    });

    it('and then trigger an error action with the error message', (result) => {
      expect(result).toEqual(
        put({
          type: 'logError',
          payload: {
            error: utils.app.createError(errorMessage),
            date: expect.any(Number),
            action,
          },
        }),
      );
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    });
  });
});
