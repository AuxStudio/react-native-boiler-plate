import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import utils from '../../../../utils';
import pop from '..';

const navigation = {
  pop: jest.fn(),
};

const action = {
  type: 'pop',
};

const nextAction = {
  type: 'SUCCESS',
};

const actionWithNextAction = { ...action, meta: { ...action.meta, nextAction } };

describe('When testing the saga without a nextAction and without a response from the api', () => {
  const it = sagaHelper(pop(action));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(JSON.stringify(call(navigation.pop)));
  });

  it('should call POP_PAGE', (result) => {
    expect(result).toEqual(
      put({
        type: 'POP_PAGE',
      }),
    );
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('When testing the saga with a nextAction and without a response from the api', () => {
  const it = sagaHelper(pop(actionWithNextAction));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(JSON.stringify(call(navigation.pop)));
  });

  it('should call POP_PAGE', (result) => {
    expect(result).toEqual(
      put({
        type: 'POP_PAGE',
      }),
    );
  });

  it('and then trigger an action', (result) => {
    expect(result).toEqual(put({ ...nextAction, payload: {} }));
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('When testing the saga when an error is thrown from the api', () => {
  const it = sagaHelper(pop(action));
  const errorMessage = 'Something went wrong';

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(JSON.stringify(call(navigation.pop)));

    return new Error(errorMessage);
  });

  it('and then trigger an error action with the error message', (result) => {
    expect(result).toEqual(
      put({
        type: 'logError',
        payload: {
          error: utils.app.createError(errorMessage),
          date: expect.any(Date),
        },
      }),
    );
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});
