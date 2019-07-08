import { takeEvery } from 'redux-saga/effects';

import { logEvent } from '../../services/analytics';
import {
  getAuth,
  signInAnonymously,
  getCredentialFromEmail,
  getCredentialFromFacebook,
  getCredentialFromGoogle,
  getCredentialAndSignIn,
  sendPasswordResetEmail,
  signInWithCredential,
  signOut,
} from '../../services/auth';
import {
  getData,
  updateData,
  setData,
  pushData,
  goOffline,
  goOnline,
} from '../../services/database';
import {
  addDocument,
  deleteDocument,
  disableNetwork,
  enableNetwork,
  getCollection,
  getDocument,
  setDocument,
  sync,
  updateDocument,
} from '../../services/firestore';
import { get, post } from '../../services/http';
import { resizeImage, showImagePicker } from '../../services/images';
import { getDeviceLocation, getFormattedAddressFromCoords } from '../../services/location';
import {
  createChannel,
  getToken,
  hasPermission,
  requestNotificationsPermission,
} from '../../services/notifications';
import {
  checkPermission,
  requestPermission,
  checkAndRequestPermission,
} from '../../services/permissions';
import { uploadFile } from '../../services/storage';

import eventChannelSaga from './eventChannelSaga';
import genericSaga from './genericSaga';

export default function* sagas() {
  // Analytics
  yield takeEvery('logEvent', genericSaga, { service: logEvent });

  // Auth
  yield takeEvery('getAuth', eventChannelSaga, { service: getAuth });
  yield takeEvery('getCredentialFromEmail', genericSaga, {
    service: getCredentialFromEmail,
  });
  yield takeEvery('getCredentialFromFacebook', genericSaga, {
    service: getCredentialFromFacebook,
  });
  yield takeEvery('getCredentialFromGoogle', genericSaga, {
    service: getCredentialFromGoogle,
  });
  yield takeEvery('getCredentialAndSignIn', genericSaga, {
    service: getCredentialAndSignIn,
  });
  yield takeEvery('sendPasswordResetEmail', genericSaga, {
    service: sendPasswordResetEmail,
  });
  yield takeEvery('signInAnonymously', genericSaga, {
    service: signInAnonymously,
  });
  yield takeEvery('signInWithCredential', genericSaga, { service: signInWithCredential });
  yield takeEvery('signOut', genericSaga, { service: signOut });

  // Database
  yield takeEvery('getData', genericSaga, { service: getData, shouldTrackEvent: true });
  yield takeEvery('updateData', genericSaga, { service: updateData, shouldTrackEvent: true });
  yield takeEvery('setData', genericSaga, { service: setData, shouldTrackEvent: true });
  yield takeEvery('pushData', genericSaga, { service: pushData, shouldTrackEvent: true });
  yield takeEvery('goOffline', genericSaga, { service: goOffline, shouldTrackEvent: true });
  yield takeEvery('goOnline', genericSaga, { service: goOnline, shouldTrackEvent: true });

  // Firestore
  yield takeEvery('addDocument', genericSaga, { service: addDocument, shouldTrackEvent: true });
  yield takeEvery('deleteDocument', genericSaga, {
    service: deleteDocument,
    shouldTrackEvent: true,
  });
  yield takeEvery('disableNetwork', genericSaga, { service: disableNetwork });
  yield takeEvery('enableNetwork', genericSaga, { service: enableNetwork });
  yield takeEvery('getCollection', genericSaga, { service: getCollection, shouldTrackEvent: true });
  yield takeEvery('getDocument', genericSaga, { service: getDocument, shouldTrackEvent: true });
  yield takeEvery('setDocument', genericSaga, { service: setDocument, shouldTrackEvent: true });
  yield takeEvery('sync', eventChannelSaga, {
    service: sync,
    shouldTrackEvent: true,
  });
  yield takeEvery('updateDocument', genericSaga, {
    service: updateDocument,
    shouldTrackEvent: true,
  });

  // HTTP
  yield takeEvery('get', genericSaga, { service: get, shouldTrackEvent: true });
  yield takeEvery('post', genericSaga, { service: post, shouldTrackEvent: true });

  // Images
  yield takeEvery('resizeImage', genericSaga, { service: resizeImage });
  yield takeEvery('showImagePicker', genericSaga, { service: showImagePicker });

  // Location
  yield takeEvery('getDeviceLocation', genericSaga, { service: getDeviceLocation });
  yield takeEvery('getFormattedAddressFromCoords', genericSaga, {
    service: getFormattedAddressFromCoords,
  });

  // Notifications
  yield takeEvery('createChannel', genericSaga, { service: createChannel });
  yield takeEvery('getToken', genericSaga, { service: getToken });
  yield takeEvery('hasPermission', genericSaga, { service: hasPermission });
  yield takeEvery('requestNotificationsPermission', genericSaga, {
    service: requestNotificationsPermission,
  });

  // Permisions
  yield takeEvery('checkPermission', genericSaga, { service: checkPermission });
  yield takeEvery('requestPermission', genericSaga, { service: requestPermission });
  yield takeEvery('checkAndRequestPermission', genericSaga, { service: checkAndRequestPermission });

  // Storage
  yield takeEvery('uploadFile', genericSaga, { service: uploadFile, shouldTrackEvent: true });
}
