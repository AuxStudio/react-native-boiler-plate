import { takeLatest, takeEvery, fork, all } from 'redux-saga/effects';

// Analytics
import { logEvent } from './analytics';

// Auth
import {
  getUserAuth,
  signInUserAnonymously,
  getUserCredentialFromEmail,
  sendPasswordResetEmail,
  getUserCredentialFromFacebook,
  getUserCredentialFromGoogle,
  signInUserWithCredential,
  signOutUser,
} from './auth';

// Location
import { getDeviceLocation, getFormattedAddressFromCoords } from './location';

// Database
import { getData, updateData, setData, pushData } from './database';

// Images
import { resizeImage, showImagePicker } from './images';

// HTTP
import { get, post } from './http';

// Storage
import { uploadFile } from './storage';

export default function* sagas() {
  yield all([
    // Analytics
    fork(takeLatest, 'logEvent', logEvent),

    // Auth
    fork(takeLatest, 'getUserAuth', getUserAuth),
    fork(takeLatest, 'signInUserAnonymously', signInUserAnonymously),
    fork(takeLatest, 'getUserCredentialFromEmail', getUserCredentialFromEmail),
    fork(takeLatest, 'sendPasswordResetEmail', sendPasswordResetEmail),
    fork(takeLatest, 'getUserCredentialFromFacebook', getUserCredentialFromFacebook),
    fork(takeLatest, 'getUserCredentialFromGoogle', getUserCredentialFromGoogle),
    fork(takeLatest, 'signInUserWithCredential', signInUserWithCredential),
    fork(takeLatest, 'signOutUser', signOutUser),

    // Location
    fork(takeLatest, 'getDeviceLocation', getDeviceLocation),
    fork(takeLatest, 'getFormattedAddressFromCoords', getFormattedAddressFromCoords),

    // Database
    fork(takeEvery, 'getData', getData),
    fork(takeEvery, 'updateData', updateData),
    fork(takeEvery, 'setData', setData),
    fork(takeEvery, 'pushData', pushData),

    // Images
    fork(takeLatest, 'resizeImage', resizeImage),
    fork(takeLatest, 'showImagePicker', showImagePicker),

    // HTTP
    fork(takeLatest, 'get', get),
    fork(takeLatest, 'post', post),

    // Storage
    fork(takeLatest, 'uploadFile', uploadFile),
  ]);
}
