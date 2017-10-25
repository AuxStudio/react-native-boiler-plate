import { call, put, all } from "redux-saga/effects";

import CloudData from "../cloudData/index";

export function* loadUserData(action) {
    const loadUserDataResponse = yield call(CloudData.loadUserData, action);
    console.log("loadUserDataResponse", loadUserDataResponse);

    if (loadUserDataResponse) {
        if (loadUserDataResponse.success && loadUserDataResponse.message) {
            yield put({
                type: "UPDATE_USER_DATA",
                userData: loadUserDataResponse.message,
            });
        } else if (
            loadUserDataResponse.success &&
            !loadUserDataResponse.message
        ) {
            // No user data (new user)
            yield put({
                type: "saveUserData",
                uid: action.uid,
                userData: action.userData,
                firstTimeUser: true,
            });
        } else {
            // We must have an error
            yield put({
                type: "SET_ERROR",
                errorType: "CLOUD_DATA",
                message: loadUserDataResponse.message,
                retryAction: {
                    type: "loadUserData",
                    data: {
                        uid: action.uid,
                        userData: action.userData,
                    },
                },
            });
        }
    }
}

export function* saveUserData(action) {
    const saveUserDataResponse = yield call(CloudData.saveUserData, action);
    console.log("saveUserDataResponse", saveUserDataResponse);

    if (saveUserDataResponse) {
        if (saveUserDataResponse.success) {
            // We use this to dispatch another action(s) that was attached from the page
            if (action.nextAction) {
                // action.nextAction can be an array of actions so lets check for that, if true, yield those actions as an array with put methods attached
                if (Array.isArray(action.nextAction)) {
                    let actionsArray = [];

                    for (let i = 0; i < action.nextAction.length; i++) {
                        actionsArray.push(put(action.nextAction[i]));
                    }

                    yield all(actionsArray);
                } else {
                    yield put(action.nextAction);
                }
            } else {
                yield put({
                    type: "SET_SUCCESS",
                    errorType: "CLOUD_DATA",
                    firstTimeUser: action.firstTimeUser,
                });
            }
        } else {
            // We must have an error
            yield put({
                type: "SET_ERROR",
                errorType: "CLOUD_DATA",
                message: saveUserDataResponse.message,
                retryAction: {
                    type: "saveUserData",
                    data: {
                        node: action.node,
                        uid: action.uid,
                        userData: action.userData,
                    },
                },
            });
        }
    }
}

export function* deleteUserData(action) {
    const deleteUserDataResponse = yield call(CloudData.deleteUserData, action);
    console.log("deleteUserDataResponse", deleteUserDataResponse);

    if (deleteUserDataResponse) {
        if (deleteUserDataResponse.success) {
            // We use this to dispatch another action(s) that was attached from the page
            if (action.nextAction) {
                // action.nextAction can be an array of actions so lets check for that, if true, yield those actions as an array with put methods attached
                if (Array.isArray(action.nextAction)) {
                    let actionsArray = [];

                    for (let i = 0; i < action.nextAction.length; i++) {
                        actionsArray.push(put(action.nextAction[i]));
                    }

                    yield all(actionsArray);
                } else {
                    yield put(action.nextAction);
                }
            } else {
                // On success, do nothing (store was updated before)
            }
        } else {
            // We must have an error
            yield put({
                type: "SET_ERROR",
                errorType: "CLOUD_DATA",
                message: deleteUserDataResponse.message,
                retryAction: {
                    type: "deleteUserData",
                    data: {
                        node: action.node,
                        uid: action.uid,
                        userData: action.userData,
                    },
                },
            });
        }
    }
}
