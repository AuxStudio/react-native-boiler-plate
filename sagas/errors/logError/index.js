import { all, put } from 'redux-saga/effects';

import utils from '../../../utils';
import config from '../../../config';

export default function* logError(action) {
  /*
      This should
        - Log the error to the db
        - SET_SYSTEM_MESSAGE
        - Post it to Slack if Slack config has been set up
  */

  try {
    const data = {
      ...action.payload.error,
      uid: action.payload.uid,
      date: action.payload.date,
    };

    const actions = [
      put({
        type: 'pushData',
        payload: {
          data,
          ref: 'errors',
        },
      }),
      put({
        type: 'SET_SYSTEM_MESSAGE',
        payload: {
          ...action.payload.error,
        },
        error: true,
      }),
    ];
    const slackAction = put({
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
    });

    if (config.slack.webhook) {
      actions.push(slackAction);
    }

    yield all(actions);
  } catch (error) {
    yield put({
      type: 'SET_SYSTEM_MESSAGE',
      payload: utils.app.createError(error),
      error: true,
    });
  }
}
