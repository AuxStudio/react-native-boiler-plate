import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import utils from '../../../../utils';
import navigateTo from '..';

const navigation = {
  navigateTo: jest.fn(),
};

const action = {
  type: 'navigateTo',
  payload: {
    page: 'test',
    props: {
      foo: 'bar',
    },
  },
};

const nextAction = {
  type: 'SUCCESS',
};

const actionWithNextAction = { ...action, meta: { ...action.meta, nextAction } };

describe('When testing the saga without a nextAction and without a response from the api', () => {
  const it = sagaHelper(navigateTo(action));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(
        call(
          navigation.navigateTo,
          action.payload.page,
          action.payload.props,
          action.payload.shouldReset,
          action.payload.shouldReplace,
        ),
      ),
    );
  });

  it('should call PUSH_PAGE', (result) => {
    expect(result).toEqual(
      put({
        type: 'PUSH_PAGE',
        payload: {
          page: action.payload.page,
        },
      }),
    );
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('When testing the saga with a nextAction and without a response from the api', () => {
  const it = sagaHelper(navigateTo(actionWithNextAction));

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(
        call(
          navigation.navigateTo,
          action.payload.page,
          action.payload.props,
          action.payload.shouldReset,
          action.payload.shouldReplace,
        ),
      ),
    );
  });

  it('should call PUSH_PAGE', (result) => {
    expect(result).toEqual(
      put({
        type: 'PUSH_PAGE',
        payload: {
          page: action.payload.page,
        },
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
  const it = sagaHelper(navigateTo(action));
  const errorMessage = 'Something went wrong';

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(
        call(
          navigation.navigateTo,
          action.payload.page,
          action.payload.props,
          action.payload.shouldReset,
          action.payload.shouldReplace,
        ),
      ),
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

describe('When testing the saga with shouldReset', () => {
  const it = sagaHelper(
    navigateTo({ ...action, payload: { ...action.payload, shouldReset: true } }),
  );

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(
        call(
          navigation.navigateTo,
          action.payload.page,
          action.payload.props,
          true,
          action.payload.shouldReplace,
        ),
      ),
    );
  });

  it('should call RESET_PAGES', (result) => {
    expect(result).toEqual(
      put({
        type: 'RESET_PAGES',
        payload: {
          page: action.payload.page,
        },
      }),
    );
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('When testing the saga with shouldReplace', () => {
  const it = sagaHelper(
    navigateTo({ ...action, payload: { ...action.payload, shouldReplace: true } }),
  );

  it('should have called the mocked API first', (result) => {
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify(
        call(
          navigation.navigateTo,
          action.payload.page,
          action.payload.props,
          action.payload.shouldReset,
          true,
        ),
      ),
    );
  });

  it('should call RESET_PAGES', (result) => {
    expect(result).toEqual(
      put({
        type: 'REPLACE_PAGE',
        payload: {
          page: action.payload.page,
        },
      }),
    );
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});
