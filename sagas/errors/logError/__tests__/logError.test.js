import { put, all } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import utils from '../../../../utils';
import config from '../../../../config';
import logError from '../';

const action = {
  type: 'logError',
  payload: {
    error: new Error('test'),
    uid: '123134234543',
  },
};

const data = {
  ...action.payload.error,
  uid: action.payload.uid,
  date: action.payload.date,
};

describe('When testing the saga without a nextAction and without a response from the api', () => {
  const it = sagaHelper(logError(action));

  it('should have yielded all of our actions', (result) => {
    expect(result).toEqual(
      all([
        put({
          type: 'pushData',
          payload: {
            data,
          },
        }),
        put({
          type: 'post',
          payload: {
            url: config.slack.webhook,
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            parameters: {
              channel: config.slack.channel,
              username: config.slack.username,
              icon_emoji: config.slack.icon_emoji,
              text: JSON.stringify(data),
            },
          },
        }),
        put({
          type: 'SET_SYSTEM_MESSAGE',
          payload: {
            ...action.payload.error,
          },
          error: true,
        }),
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
          type: 'pushData',
          payload: {
            data,
          },
        }),
        put({
          type: 'post',
          payload: {
            url: config.slack.webhook,
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            parameters: {
              channel: config.slack.channel,
              username: config.slack.username,
              icon_emoji: config.slack.icon_emoji,
              text: JSON.stringify(data),
            },
          },
        }),
        put({
          type: 'SET_SYSTEM_MESSAGE',
          payload: {
            ...action.payload.error,
          },
          error: true,
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
