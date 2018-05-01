import { call, put } from 'redux-saga/effects';
import { permissions } from '../../services';
import { Platform } from 'react-native';

export default function* checkAndRequestPermission(action) {
  try {
    const checkPermissionResponse = yield call(
      permissions.checkPermission,
      action.payload.permission,
    );

    if (__DEV__) {
      console.log('checkPermission', checkPermissionResponse);
    }

    if (checkPermissionResponse === 'authorized') {
      if (action.nextAction) {
        yield put({
          ...action.nextAction,
          payload: checkPermissionResponse,
        });
      }
    } else if (
      checkPermissionResponse === 'undetermined' ||
      (checkPermissionResponse === 'denied' && Platform.OS === 'android')
    ) {
      try {
        const requestPermissionResponse = yield call(
          permissions.requestPermission,
          action.payload.permission,
        );

        if (__DEV__) {
          console.log('requestPermission', requestPermissionResponse);
        }

        if (action.nextAction) {
          yield put({
            ...action.nextAction,
            payload: checkPermissionResponse,
          });
        }
      } catch (error) {
        const payload = error instanceof Error ? error : new Error(error);

        yield put({
          type: 'SET_SYSTEM_MESSAGE',
          payload,
          error: true,
        });
      }
    } else if (
      (checkPermissionResponse === 'denied' && Platform.OS === 'ios') ||
      checkPermissionResponse === 'restricted'
    ) {
      yield put({
        type: 'SET_SYSTEM_MESSAGE',
        payload: new Error(`We need your permission to access your: ${action.payload.permission}`),
        error: true,
      });
    }
  } catch (error) {
    const payload = error instanceof Error ? error : new Error(error);

    yield put({
      type: 'SET_SYSTEM_MESSAGE',
      payload,
      error: true,
    });
  }
}
