import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import utils from '../../../../utils';
import setDocument from '../';

const firestore = {
  setDocument: jest.fn(),
};

const action = {
  type: 'setDocument',
  meta: {
    pathParts: ['collection', 'document'],
  },
  payload: {
    document: {
      testing: true,
    },
  },
};

const nextAction = {
  type: 'SUCCESS',
};

const actionWithNextAction = { ...action, meta: { ...action.meta, nextAction } };

const response = { foo: 'bar' };

describe('When testing the saga without a nextAction and without a response from the api', () => {
  const it = sagaHelper(setDocument(action));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(call(firestore.setDocument, action.meta.pathParts, action.payload.document)),
    );
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('When testing the saga without a nextAction and with a response from the api', () => {
  const it = sagaHelper(setDocument(action));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(call(firestore.setDocument, action.meta.pathParts, action.payload.document)),
    );

    return response;
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('When testing the saga with a nextAction and without a response from the api', () => {
  const it = sagaHelper(setDocument(actionWithNextAction));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(call(firestore.setDocument, action.meta.pathParts, action.payload.document)),
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
  const it = sagaHelper(setDocument(actionWithNextAction));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(call(firestore.setDocument, action.meta.pathParts, action.payload.document)),
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
  const it = sagaHelper(setDocument(action));
  const errorMessage = 'Something went wrong';

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(call(firestore.setDocument, action.meta.pathParts, action.payload.document)),
    );

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
