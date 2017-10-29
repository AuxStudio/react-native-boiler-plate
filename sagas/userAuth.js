import { call, put } from "redux-saga/effects";

import UserAuth from "../userAuth/index";

export function* getUserAuth() {
    const getUserAuthResponse = yield call(UserAuth.getUserAuth);
    console.log("getUserAuthResponse", getUserAuthResponse);

    if (getUserAuthResponse.authenticated) {
        yield put({
            type: "SIGN_IN_USER",
            uid: getUserAuthResponse.message.uid,
            userName: getUserAuthResponse.message.userName,
            userEmail: getUserAuthResponse.message.userEmail,
            userPhotoURL: getUserAuthResponse.message.userPhotoURL,
            anonymous: getUserAuthResponse.message.anonymous,
        });
    } else {
        yield put({
            type: "signInUserAnonymously",
        });
    }
}

export function* signInUserAnonymously() {
    const signInUserAnonymouslyResponse = yield call(
        UserAuth.signInUserAnonymously
    );
    console.log("signInUserAnonymouslyResponse", signInUserAnonymouslyResponse);

    if (signInUserAnonymouslyResponse.authenticated) {
        yield put({
            type: "SIGN_IN_USER",
            uid: signInUserAnonymouslyResponse.message.uid,
            anonymous: true,
        });
    } else {
        yield put({
            type: "SET_ERROR",
            errorType: "AUTH",
            message:
                "We were unable to connect. Check your connection and try again.",
            retryAction: {
                type: "signInUserAnonymously",
            },
        });
    }
}

export function* signInUserWithEmail(action) {
    const signInUserWithEmailResponse = yield call(
        UserAuth.signInUserWithEmail,
        action
    );
    console.log("signInUserWithEmailResponse", signInUserWithEmailResponse);

    if (signInUserWithEmailResponse.success) {
        yield put({
            type: "linkUserWithCredential",
            credential: signInUserWithEmailResponse.message.credential,
        });
    } else {
        yield put({
            type: "SET_ERROR",
            errorType: "AUTH",
            message:
                "We were unable to connect with email. Check your connection and try again.",
            retryAction: {
                type: "signInUserWithEmail",
                data: {
                    userEmail: action.userEmail,
                    userPassword: action.userPassword,
                },
            },
        });
    }
}

export function* sendPasswordResetEmail(action) {
    const passwordResetResponse = yield call(
        UserAuth.sendPasswordResetEmail,
        action
    );
    console.log("passwordResetResponse", passwordResetResponse);

    if (passwordResetResponse.success) {
        yield put({
            type: "SET_SUCCESS",
            errorType: "USER",
            message: "Email sent successfully",
        });
    } else {
        yield put({
            type: "SET_ERROR",
            errorType: "AUTH",
            message:
                passwordResetResponse.message.code === "auth/user-not-found"
                    ? "We couldn't find your email address. Please sign up."
                    : "We were unable to send a password reset request. Check your connection and try again.",
            retryAction: {
                type: "sendPasswordResetEmail",
                data: {
                    userEmail: action.userEmail,
                },
            },
        });
    }
}

export function* signInUserWithFacebook() {
    const signInUserWithFacebookResponse = yield call(
        UserAuth.signInUserWithFacebook
    );
    console.log(
        "signInUserWithFacebookResponse",
        signInUserWithFacebookResponse
    );

    if (signInUserWithFacebookResponse.success) {
        yield put({
            type: "linkUserWithCredential",
            credential: signInUserWithFacebookResponse.message.credential,
        });
    } else {
        yield put({
            type: "SET_ERROR",
            errorType: "AUTH",
            message:
                "We were unable to connect with Facebook. Check your connection and try again.",
            retryAction: {
                type: "signInUserWithFacebook",
            },
        });
    }
}

export function* signInUserWithGoogle() {
    const signInUserWithGoogleResponse = yield call(
        UserAuth.signInUserWithGoogle
    );
    console.log("signInUserWithGoogleResponse", signInUserWithGoogleResponse);

    if (signInUserWithGoogleResponse.success) {
        yield put({
            type: "linkUserWithCredential",
            credential: signInUserWithGoogleResponse.message.credential,
        });
    } else {
        yield put({
            type: "SET_ERROR",
            errorType: "AUTH",
            message:
                "We were unable to connect with Google. Check your connection and try again.",
            retryAction: {
                type: "signInUserWithGoogle",
            },
        });
    }
}

export function* linkUserWithCredential(action) {
    const linkUserWithCredentialResponse = yield call(
        UserAuth.linkUserWithCredential,
        action
    );
    console.log(
        "linkUserWithCredentialResponse",
        linkUserWithCredentialResponse
    );

    if (linkUserWithCredentialResponse.authenticated) {
        yield put({
            type: "SIGN_IN_USER",
            uid: linkUserWithCredentialResponse.message.uid,
            userEmail: linkUserWithCredentialResponse.message.userEmail,
            userName: linkUserWithCredentialResponse.message.userName,
            userPhotoURL: linkUserWithCredentialResponse.message.userPhotoURL,
            anonymous: false,
        });
    } else {
        yield put({
            type: "SET_ERROR",
            errorType: "AUTH",
            message:
                "We were unable to connect. Check your connection and try again.",
            retryAction: {
                type: "linkUserWithCredential",
                credential: action.credential,
            },
        });
    }
}

export function* signOutUser() {
    const signOutUserResponse = yield call(UserAuth.signOutUser);
    console.log("signOutUserResponse", signOutUserResponse);

    if (signOutUserResponse.success) {
        yield put({
            type: "SIGN_OUT_USER",
        });
    } else {
        yield put({
            type: "SET_ERROR",
            errorType: "AUTH",
            message:
                "We were unable to sign you out. Check your connection and try again.",
            retryAction: {
                type: "signOutUser",
            },
        });
    }
}
