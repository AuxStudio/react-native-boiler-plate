import { call, put, all } from "redux-saga/effects";

import CloudData from "../cloudData/index";

export function* getData(action) {
    const getDataResponse = yield call(CloudData.getData, action);
    console.log("getDataResponse", getDataResponse);

    if (getDataResponse) {
        if (getDataResponse.success) {
            yield all([
                put({
                    type:
                        action.node === "users"
                            ? "SET_USER_DATA"
                            : "SET_APP_DATA",
                    data: getDataResponse.message,
                    node: action.node,
                    subNode: action.subNode,
                }),
                put({
                    type: "SET_SUCCESS",
                    errorType: "CLOUD_DATA",
                }),
            ]);
        } else {
            // We must have an error
            yield put({
                type: "SET_ERROR",
                errorType: "CLOUD_DATA",
                message: getDataResponse.message,
                retryAction: {
                    type: "getData",
                    data: {
                        node: action.node,
                        subNode: action.subNode,
                        uid: action.uid,
                    },
                },
            });
        }
    }
}

export function* updateData(action) {
    const updateDataResponse = yield call(CloudData.updateData, action);
    console.log("updateDataResponse", updateDataResponse);

    if (updateDataResponse) {
        if (updateDataResponse.success) {
            yield put({
                type: "SET_SUCCESS",
                errorType: "CLOUD_DATA",
            });
        } else {
            // We must have an error
            yield put({
                type: "SET_ERROR",
                errorType: "CLOUD_DATA",
                message: updateDataResponse.message,
                retryAction: {
                    type: "updateData",
                    data: {
                        node: action.node,
                        subNode: action.subNode,
                        uid: action.uid,
                        data: action.data,
                    },
                },
            });
        }
    }
}

export function* pushData(action) {
    const pushDataResponse = yield call(CloudData.pushData, action);
    console.log("pushDataResponse", pushDataResponse);

    if (pushDataResponse) {
        if (pushDataResponse.success) {
            yield put({
                type: "SET_SUCCESS",
                errorType: "CLOUD_DATA",
            });
        } else {
            // We must have an error
            yield put({
                type: "SET_ERROR",
                errorType: "CLOUD_DATA",
                message: pushDataResponse.message,
                retryAction: {
                    type: "updateData",
                    data: {
                        node: action.node,
                        subNode: action.subNode,
                        uid: action.uid,
                        data: action.data,
                    },
                },
            });
        }
    }
}

export function* deleteData(action) {
    const deleteDataResponse = yield call(CloudData.deleteData, action);
    console.log("deleteDataResponse", deleteDataResponse);

    if (deleteDataResponse) {
        if (deleteDataResponse.success) {
            yield put({
                type: "SET_SUCCESS",
                errorType: "CLOUD_DATA",
            });
        } else {
            // We must have an error
            yield put({
                type: "SET_ERROR",
                errorType: "CLOUD_DATA",
                message: deleteDataResponse.message,
                retryAction: {
                    type: "deleteData",
                    data: {
                        node: action.node,
                        uid: action.uid,
                        data: action.data,
                    },
                },
            });
        }
    }
}
