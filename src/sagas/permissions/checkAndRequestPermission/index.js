import { call, put } from 'redux-saga/effects';
import { Platform } from 'react-native';

import { permissions } from '../../../services';
import utils from '../../../utils';

export default function* checkAndRequestPermission(action) {
  try {
    const checkPermissionResponse = yield call(
      permissions.checkPermission,
      action.payload.permission,
    );
    const nextActionOne = utils.app.prepareNextAction(action, checkPermissionResponse);

    if (checkPermissionResponse.message === 'authorized' && nextActionOne) {
      yield put(nextActionOne);
    } else if (
      checkPermissionResponse.message === 'undetermined' ||
      (checkPermissionResponse.message === 'denied' && Platform.OS === 'android')
    ) {
      try {
        const requestPermissionResponse = yield call(
          permissions.requestPermission,
          action.payload.permission,
        );
        const nextActionTwo = utils.app.prepareNextAction(action);

        if (requestPermissionResponse.message === 'authorized' && nextActionTwo) {
          yield put(nextActionTwo);
        } else if (requestPermissionResponse.message !== 'authorized') {
          yield put({
            type: 'logError',
            payload: {
              error: utils.app.createError(
                `We need your permission to access your ${action.payload.permission}`,
              ),
              date: Date.now(),
              action,
            },
          });
        }
      } catch (error) {
        yield put({
          type: 'logError',
          payload: {
            error: utils.app.createError(error),
            date: Date.now(),
            action,
          },
        });
      }
    } else if (
      (checkPermissionResponse.message === 'denied' && Platform.OS === 'ios') ||
      checkPermissionResponse.message === 'restricted'
    ) {
      yield put({
        type: 'logError',
        payload: {
          error: utils.app.createError(
            `We need your permission to access your ${action.payload.permission}`,
          ),
          date: Date.now(),
          action,
        },
      });
    }
  } catch (error) {
    yield put({
      type: 'logError',
      payload: {
        error: utils.app.createError(error),
        date: Date.now(),
        action,
      },
    });
  }
}
