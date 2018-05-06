import { call, put } from 'redux-saga/effects';
import { Platform } from 'react-native';
import { permissions } from '../../services';
import utils from '../../utils';

export default function* checkAndRequestPermission(action) {
  try {
    const checkPermissionResponse = yield call(
      permissions.checkPermission,
      action.payload.permission,
    );

    if (checkPermissionResponse === 'authorized') {
      if (action.meta.nextAction) {
        yield put({
          ...action.meta.nextAction,
          payload: checkPermissionResponse,
        });
      }
    } else if (
      checkPermissionResponse === 'undetermined' ||
      (checkPermissionResponse === 'denied' && Platform.OS === 'android')
    ) {
      try {
        yield call(permissions.requestPermission, action.payload.permission);

        if (action.meta.nextAction) {
          yield put({
            ...action.meta.nextAction,
            payload: checkPermissionResponse,
          });
        }
      } catch (error) {
        yield put({
          type: 'SET_SYSTEM_MESSAGE',
          payload: utils.createError(error),
          error: true,
        });
      }
    } else if (
      (checkPermissionResponse === 'denied' && Platform.OS === 'ios') ||
      checkPermissionResponse === 'restricted'
    ) {
      yield put({
        type: 'SET_SYSTEM_MESSAGE',
        payload: utils.createError(
          `We need your permission to access your: ${action.payload.permission}`,
        ),
        error: true,
      });
    }
  } catch (error) {
    yield put({
      type: 'SET_SYSTEM_MESSAGE',
      payload: utils.createError(error),
      error: true,
    });
  }
}
