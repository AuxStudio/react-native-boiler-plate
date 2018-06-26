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

import { get, post } from './http';

import { resizeImage, showImagePicker } from './images';

import { getDeviceLocation, getFormattedAddressFromCoords } from './location';

import { checkPermission, requestPermission, checkAndRequestPermission } from './permissions';

import { uploadFile } from './storage';

import { logError } from './errors';

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

    fork(takeLatest, 'get', get),
    fork(takeLatest, 'post', post),

    fork(takeLatest, 'resizeImage', resizeImage),
    fork(takeLatest, 'showImagePicker', showImagePicker),

    fork(takeLatest, 'getDeviceLocation', getDeviceLocation),
    fork(takeLatest, 'getFormattedAddressFromCoords', getFormattedAddressFromCoords),

    fork(takeLatest, 'checkPermission', checkPermission),
    fork(takeLatest, 'requestPermission', requestPermission),
    fork(takeLatest, 'checkAndRequestPermission', checkAndRequestPermission),

    fork(takeLatest, 'uploadFile', uploadFile),

    fork(takeLatest, 'logError', logError),
  ]);
}
