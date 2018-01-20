import { takeLatest, takeEvery, fork, all } from "redux-saga/effects";

// Auth
import { getUserAuth } from "./userAuth";
import { signInUserAnonymously } from "./userAuth";
import { getUserCredentialFromEmail } from "./userAuth";
import { sendPasswordResetEmail } from "./userAuth";
import { getUserCredentialFromFacebook } from "./userAuth";
import { getUserCredentialFromGoogle } from "./userAuth";
import { linkUserWithCredential } from "./userAuth";
import { signInUserWithCredential } from "./userAuth";
import { signOutUser } from "./userAuth";

// Geolocation
import {
    getUserLocation,
    getFormattedAddressFromCoordinates,
} from "./geolocation";

// Cloud Data
import { getData } from "./cloudData";
import { updateData } from "./cloudData";
import { setData } from "./cloudData";
import { pushData } from "./cloudData";
import { deleteData } from "./cloudData";

// Images
import { handleImage } from "./images";

// File System
import { deleteFile } from "./fileSystem";

// HTTP
import { get } from "./http";

export function* sagas() {
    yield all([
        // User auth
        fork(takeLatest, "getUserAuth", getUserAuth),
        fork(takeLatest, "signInUserAnonymously", signInUserAnonymously),
        fork(
            takeLatest,
            "getUserCredentialFromEmail",
            getUserCredentialFromEmail,
        ),
        fork(takeLatest, "sendPasswordResetEmail", sendPasswordResetEmail),
        fork(
            takeLatest,
            "getUserCredentialFromFacebook",
            getUserCredentialFromFacebook,
        ),
        fork(
            takeLatest,
            "getUserCredentialFromGoogle",
            getUserCredentialFromGoogle,
        ),
        fork(takeLatest, "linkUserWithCredential", linkUserWithCredential),
        fork(takeLatest, "signInUserWithCredential", signInUserWithCredential),
        fork(takeLatest, "signOutUser", signOutUser),

        // Geolocation
        fork(takeLatest, "getUserLocation", getUserLocation),
        fork(
            takeLatest,
            "getFormattedAddressFromCoordinates",
            getFormattedAddressFromCoordinates,
        ),

        // Cloud Data
        fork(takeEvery, "getData", getData),
        fork(takeEvery, "updateData", updateData),
        fork(takeEvery, "setData", setData),
        fork(takeEvery, "pushData", pushData),
        fork(takeEvery, "deleteData", deleteData),
        // Images
        fork(takeLatest, "handleImage", handleImage),

        // File System
        fork(takeEvery, "deleteFile", deleteFile),

        // HTTP
        fork(takeLatest, "get", get),
    ]);
}
