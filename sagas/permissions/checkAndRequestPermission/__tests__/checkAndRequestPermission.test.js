import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import utils from '../../../../utils';
import checkAndRequestPermission from '..';

// This saga uses the Platform module so let's mock it to test our conditions
jest.mock('Platform', () => {
  const Platform = require.requireActual('Platform');
  Platform.OS = 'android';
  return Platform;
});

const permissions = {
  checkAndRequestPermission: jest.fn(),
  checkPermission: jest.fn(),
  requestPermission: jest.fn(),
};

const action = {
  type: 'checkAndRequestPermission',
  payload: {
    permission: 'camera',
  },
};

const nextAction = {
  type: 'SUCCESS',
};

const actionWithNextAction = { ...action, meta: { nextAction } };

const responses = {
  authorized: { message: 'authorized' },
  undetermined: { message: 'undetermined' },
  denied: { message: 'denied' },
};

describe('checkAndRequestPermissions saga', () => {
  describe('When testing the saga without a nextAction and with an authorized response from the checkPermission api', () => {
    const it = sagaHelper(checkAndRequestPermission(action));

    it('should have called the mocked API first', (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(call(permissions.checkPermission, action.payload.permission)),
      );

      return responses.authorized;
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('When testing the saga without a nextAction and with an undetermined response from the checkPermission api and an authorized response from the requestPermission api', () => {
    const it = sagaHelper(checkAndRequestPermission(action));

    it('should have called the mocked checkPermission API first', (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(call(permissions.checkPermission, action.payload.permission)),
      );

      return responses.undetermined;
    });

    it('should have called the mocked requestPermission API next', (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(call(permissions.requestPermission, action.payload.permission)),
      );

      return responses.authorized;
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('When testing the saga with a nextAction and with an undetermined response from the checkPermission api and an authorized response from the requestPermission api', () => {
    const it = sagaHelper(checkAndRequestPermission(actionWithNextAction));

    it('should have called the mocked checkPermission API first', (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(call(permissions.checkPermission, action.payload.permission)),
      );

      return responses.undetermined;
    });

    it('should have called the mocked requestPermission API next', (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(call(permissions.requestPermission, action.payload.permission)),
      );

      return responses.authorized;
    });

    it('and then trigger an action', (result) => {
      expect(result).toEqual(put({ ...nextAction, payload: {} }));
    });

    it('and then nothing', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('When testing the saga without a nextAction and with an undetermined response from the checkPermission api and an undetermined response from the requestPermission api', () => {
    const it = sagaHelper(checkAndRequestPermission(action));

    it('should have called the mocked checkPermission API first', (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(call(permissions.checkPermission, action.payload.permission)),
      );

      return responses.undetermined;
    });

    it('should have called the mocked requestPermission API next', (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(call(permissions.requestPermission, action.payload.permission)),
      );

      return responses.undetermined;
    });

    it('should have called SET_SYSTEM_MESSAGE to set an error next', (result) => {
      expect(result).toEqual(
        put({
          type: 'logError',
          payload: {
            error: utils.app.createError(
              `We need your permission to access your ${action.payload.permission}`,
            ),
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

  describe('When testing the saga without a nextAction and with a denied response from the checkPermission api and an undetermined response from the requestPermission api on Android', () => {
    const it = sagaHelper(checkAndRequestPermission(action));

    it('should have called the mocked checkPermission API first', (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(call(permissions.checkPermission, action.payload.permission)),
      );

      return responses.undetermined;
    });

    it('should have called the mocked requestPermission API next', (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(call(permissions.requestPermission, action.payload.permission)),
      );

      return responses.denied;
    });

    it('should have called SET_SYSTEM_MESSAGE to set an error next', (result) => {
      expect(result).toEqual(
        put({
          type: 'logError',
          payload: {
            error: utils.app.createError(
              `We need your permission to access your ${action.payload.permission}`,
            ),
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

  describe('When testing the saga when an error is thrown from the checkPermission api', () => {
    const it = sagaHelper(checkAndRequestPermission(action));
    const errorMessage = 'Something went wrong';

    it('should have called the mocked checkPermission API first', (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(call(permissions.checkPermission, action.payload.permission)),
      );

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

  describe('When testing the saga when an error is thrown from the requestPermission api', () => {
    const it = sagaHelper(checkAndRequestPermission(action));
    const errorMessage = 'Something went wrong';

    it('should have called the mocked checkPermission API first', (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(call(permissions.checkPermission, action.payload.permission)),
      );

      return responses.undetermined;
    });

    it('should have called the mocked requestPermission API next', (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(call(permissions.requestPermission, action.payload.permission)),
      );

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
