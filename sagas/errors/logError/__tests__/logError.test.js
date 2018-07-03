import { put, all } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import utils from '../../../../utils';
import logError from '..';

const action = {
  type: 'logError',
  payload: {
    error: new Error('test'),
    uid: '123134234543',
  },
};

describe('logError saga', () => {
  describe('When testing the saga without a nextAction and without a response from the api', () => {
    const it = sagaHelper(logError(action));

    it('should have yielded all of our actions', (result) => {
      expect(result).toEqual(
        all([
          // NOTE: Since, __DEV__, pushData should not be called
          put({
            type: 'SET_SYSTEM_MESSAGE',
            payload: {
              message: action.payload.error.message,
            },
          }),
          // NOTE: no slack action should be called since there is no slack config
        ]),
      );
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('When testing the saga when an error is thrown from the api', () => {
    const it = sagaHelper(logError(action));
    const errorMessage = 'Something went wrong';

    it('should have yielded all of our actions', (result) => {
      expect(result).toEqual(
        all([
          put({
            type: 'SET_SYSTEM_MESSAGE',
            payload: {
              message: action.payload.error.message,
            },
          }),
        ]),
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
});
