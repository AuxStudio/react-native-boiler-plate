import { takeLatest, takeEvery, fork, all } from 'redux-saga/effects';

import { logEvent } from './analytics';

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
} from './auth';

import { getData, updateData, setData, pushData, goOffline, goOnline } from './database';

import { logError } from './errors';

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
} from './firestore';

import { get, post } from './http';

import { resizeImage, showImagePicker } from './images';

import { getDeviceLocation, getFormattedAddressFromCoords } from './location';

import {
  createChannel,
  getToken,
  hasPermission,
  requestNotificationsPermission,
} from './notifications';

import { checkPermission, requestPermission, checkAndRequestPermission } from './permissions';

import { uploadFile } from './storage';

export default function* sagas() {
  yield all([
    fork(takeLatest, 'logEvent', logEvent),

    fork(takeLatest, 'getAuth', getAuth),
    fork(takeLatest, 'signInAnonymously', signInAnonymously),
    fork(takeLatest, 'getCredentialFromEmail', getCredentialFromEmail),
    fork(takeLatest, 'getCredentialFromFacebook', getCredentialFromFacebook),
    fork(takeLatest, 'getCredentialFromGoogle', getCredentialFromGoogle),
    fork(takeLatest, 'getCredentialAndSignIn', getCredentialAndSignIn),
    fork(takeLatest, 'sendPasswordResetEmail', sendPasswordResetEmail),
    fork(takeLatest, 'signInWithCredential', signInWithCredential),
    fork(takeLatest, 'signOut', signOut),

    fork(takeEvery, 'getData', getData),
    fork(takeEvery, 'updateData', updateData),
    fork(takeEvery, 'setData', setData),
    fork(takeEvery, 'pushData', pushData),
    fork(takeEvery, 'goOffline', goOffline),
    fork(takeEvery, 'goOnline', goOnline),

    fork(takeEvery, 'addDocument', addDocument),
    fork(takeEvery, 'deleteDocument', deleteDocument),
    fork(takeEvery, 'disableNetwork', disableNetwork),
    fork(takeEvery, 'enableNetwork', enableNetwork),
    fork(takeEvery, 'getCollection', getCollection),
    fork(takeEvery, 'getDocument', getDocument),
    fork(takeEvery, 'setDocument', setDocument),
    fork(takeEvery, 'sync', sync),
    fork(takeEvery, 'updateDocument', updateDocument),

    fork(takeLatest, 'logError', logError),

    fork(takeLatest, 'get', get),
    fork(takeLatest, 'post', post),

    fork(takeLatest, 'resizeImage', resizeImage),
    fork(takeLatest, 'showImagePicker', showImagePicker),

    fork(takeLatest, 'getDeviceLocation', getDeviceLocation),
    fork(takeLatest, 'getFormattedAddressFromCoords', getFormattedAddressFromCoords),

    fork(takeLatest, 'createChannel', createChannel),
    fork(takeLatest, 'getToken', getToken),
    fork(takeLatest, 'hasPermission', hasPermission),
    fork(takeLatest, 'requestNotificationsPermission', requestNotificationsPermission),

    fork(takeLatest, 'checkPermission', checkPermission),
    fork(takeLatest, 'requestPermission', requestPermission),
    fork(takeLatest, 'checkAndRequestPermission', checkAndRequestPermission),

    fork(takeLatest, 'uploadFile', uploadFile),
  ]);
}
