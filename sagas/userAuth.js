import { call, put } from "redux-saga/effects";

import UserAuth from "../userAuth/index";

export function* getUserAuth() {
    const getUserAuthResponse = yield call(UserAuth.getUserAuth);
    console.log("getUserAuthResponse", getUserAuthResponse);

    if (getUserAuthResponse.authenticated) {
        yield put({
            type: "SIGN_IN_USER",
            uid: getUserAuthResponse.message.uid,
            anonymous: getUserAuthResponse.message.anonymous,
        });
    } else {
        yield put({
            type: "REDIRECT_USER_TO_WELCOME_PAGE",
        });
    }
}

export function* signInUserWithEmail(action) {
    const signUpUserWithEmailResponse = yield call(
        UserAuth.signUpUserWithEmail,
        action
    );
    console.log("signUpUserWithEmailResponse", signUpUserWithEmailResponse);

    if (signUpUserWithEmailResponse.authenticated) {
        yield put({
            type: "SIGN_IN_USER",
            uid: signUpUserWithEmailResponse.message.uid,
            userEmail: signUpUserWithEmailResponse.message.userEmail,
            anonymous: false,
        });
    } else {
        let emailInUse = false;

        if (
            signUpUserWithEmailResponse.message === "auth/email-already-in-use"
        ) {
            emailInUse = true;
        }

        const signInUserWithEmailResponse = yield call(
            UserAuth.signInUserWithEmail,
            action
        );
        console.log("signInUserWithEmailResponse", signInUserWithEmailResponse);

        if (signInUserWithEmailResponse.authenticated) {
            yield put({
                type: "SIGN_IN_USER",
                uid: signInUserWithEmailResponse.message.uid,
                anonymous: false,
            });
        } else {
            yield put({
                type: "SET_ERROR",
                errorType: "AUTH",
                message: emailInUse
                    ? "This email address is already in use. Check your password and try again."
                    : "We were unable to connect with email. Check your connection and try again.",
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
    const signInFacebookResponse = yield call(UserAuth.signInUserWithFacebook);
    console.log("signInFacebookResponse", signInFacebookResponse);

    if (signInFacebookResponse.authenticated) {
        yield put({
            type: "SIGN_IN_USER",
            uid: signInFacebookResponse.message.uid,
            userEmail: signInFacebookResponse.message.userEmail,
            userName: signInFacebookResponse.message.userName,
            userPhotoUrl: {
                cropped: signInFacebookResponse.message.userPhotoURL,
            },
            anonymous: false,
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
    const signInGoogleResponse = yield call(UserAuth.signInUserWithGoogle);
    console.log("signInGoogleResponse", signInGoogleResponse);

    if (signInGoogleResponse.authenticated) {
        yield put({
            type: "SIGN_IN_USER",
            uid: signInGoogleResponse.message.uid,
            userEmail: signInGoogleResponse.message.userEmail,
            userName: signInGoogleResponse.message.userName,
            userPhotoUrl: {
                cropped: signInGoogleResponse.message.userPhotoURL,
            },
            anonymous: false,
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
