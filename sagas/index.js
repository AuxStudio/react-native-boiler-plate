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
  linkUserWithCredential,
  signInUserWithCredential,
  signOutUser,
} from './auth';

// Location
import { getDeviceLocation, getFormattedAddressFromCoordinates } from './location';

// Database
import { getData, updateData, setData, pushData, deleteData } from './database';

// Images
import { handleImage } from './images';

// HTTP
import { get } from './http';

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
    fork(takeLatest, 'linkUserWithCredential', linkUserWithCredential),
    fork(takeLatest, 'signInUserWithCredential', signInUserWithCredential),
    fork(takeLatest, 'signOutUser', signOutUser),

    // Location
    fork(takeLatest, 'getDeviceLocation', getDeviceLocation),
    fork(takeLatest, 'getFormattedAddressFromCoordinates', getFormattedAddressFromCoordinates),

    // Database
    fork(takeEvery, 'getData', getData),
    fork(takeEvery, 'updateData', updateData),
    fork(takeEvery, 'setData', setData),
    fork(takeEvery, 'pushData', pushData),
    fork(takeEvery, 'deleteData', deleteData),

    // Images
    fork(takeLatest, 'handleImage', handleImage),

    // HTTP
    fork(takeLatest, 'get', get),
  ]);
}
