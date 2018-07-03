import { all, put } from 'redux-saga/effects';

import utils from '../../../utils';
import config from '../../../config';

export default function* logError(action) {
  /*
      This should
        - If in production:
          - Log the error to the db
          - SET_SYSTEM_MESSAGE
          - If Slack config has been set up
            - Post to Slack
        - If in development
          - SET_SYSTEM_MESSAGE
  */

  try {
    const data = {
      ...action.payload.error,
      uid: action.payload.uid,
      date: action.payload.date,
      action: action.payload.action,
    };

    const actions = [
      put({
        type: 'SET_SYSTEM_MESSAGE',
        payload: {
          message: action.payload.error.message,
        },
      }),
    ];

    const databaseAction = put({
      type: 'pushData',
      payload: {
        data,
        ref: 'errors',
      },
    });

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

    if (!__DEV__) {
      actions.push(databaseAction);

      if (config.slack.webhook) {
        actions.push(slackAction);
      }
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
