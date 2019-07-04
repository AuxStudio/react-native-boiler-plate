import { all, put } from 'redux-saga/effects';

import { app } from '../../../../utils';
import { slack } from '../../../../config';

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
      type: 'addDocument',
      meta: {
        pathParts: 'errors',
      },
      payload: {
        document: data,
      },
    });

    const slackAction = put({
      type: 'post',
      payload: {
        url: slack.webhook,
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        parameters: {
          channel: slack.channel,
          username: slack.username,
          icon_emoji: slack.icon_emoji,
          text: JSON.stringify(data),
        },
      },
    });

    if (!__DEV__) {
      actions.push(databaseAction);

      if (slack.webhook) {
        actions.push(slackAction);
      }
    }

    yield all(actions);
  } catch (error) {
    yield put({
      type: 'SET_SYSTEM_MESSAGE',
      payload: app.createError(error),
      error: true,
    });
  }
}
