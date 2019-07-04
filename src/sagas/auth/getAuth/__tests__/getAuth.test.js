import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import utils from '../../../../utils';
import getAuth from '..';

const auth = {
  getAuth: jest.fn(),
};

const action = {
  type: 'getAuth',
};

const nextAction = {
  type: 'SUCCESS',
};

const actionWithNextAction = { ...action, meta: { nextAction } };

const response = { foo: 'bar' };

describe('getAuth saga', () => {
  describe('When testing the saga without a nextAction and without a response from the api', () => {
    const it = sagaHelper(getAuth(action));

    it('should have called the mocked API first', (result) => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(auth.getAuth)));
    });

    // Insert test for default nextAction
    it('and then trigger the signInAnonymously action', (result) => {
      expect(result).toEqual(put({ type: 'signInAnonymously' }));
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('When testing the saga without a nextAction and with a response from the api', () => {
    const it = sagaHelper(getAuth(action));

    it('should have called the mocked API first', (result) => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(auth.getAuth)));

      // mock return respone from api
      return response;
    });

    // Insert test for default nextAction
    it('and then trigger the SIGN_IN_USER action', (result) => {
      expect(result).toEqual(put({ type: 'SIGN_IN_USER', payload: response }));
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('When testing the saga with a nextAction and without a response from the api', () => {
    const it = sagaHelper(getAuth(actionWithNextAction));

    it('should have called the mocked API first', (result) => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(auth.getAuth)));
    });

    it('and then trigger an action', (result) => {
      expect(result).toEqual(put({ ...nextAction, payload: {} }));
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('When testing the saga with a nextAction and with a response from the api', () => {
    const it = sagaHelper(getAuth(actionWithNextAction));

    it('should have called the mocked API first', (result) => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(auth.getAuth)));

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
    const it = sagaHelper(getAuth(action));
    const errorMessage = 'Something went wrong';

    it('should have called the mocked API first', (result) => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(call(auth.getAuth)));

      return new Error(errorMessage);
    });

    it('and then trigger an error action with the error message', (result) => {
      expect(result).toEqual(
        put({
          type: 'logError',
          payload: expect.objectContaining({
            error: utils.app.createError(errorMessage),
            action,
          }),
        }),
      );
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    });
  });
});
