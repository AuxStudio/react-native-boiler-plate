import { call, put, all } from "redux-saga/effects";

import CloudData from "../cloudData/index";

export function* getData(action) {
    const getDataResponse = yield call(CloudData.getData, action);
    if (__DEV__) {
        console.log("getDataResponse", getDataResponse.success);
    }

    if (getDataResponse) {
        if (getDataResponse.success) {
            yield put({
                type: action.nextActionType,
                data: getDataResponse.message,
            });
        } else {
            // We must have an error
            yield put({
                type: "SET_ERROR",
                errorType: "CLOUD_DATA",
                message: getDataResponse.message,
                retryAction: {
                    type: "getData",
                    data: {
                        nextActionType: action.nextActionType,
                        node: action.node,
                    },
                },
            });
        }
    }
}

export function* updateData(action) {
    const updateDataResponse = yield call(CloudData.updateData, action);
    if (__DEV__) {
        console.log("updateDataResponse", updateDataResponse);
    }

    if (updateDataResponse) {
        if (updateDataResponse.success) {
            if (action.nextActionType) {
                yield put({
                    type: action.nextActionType,
                    node: action.node,
                    data: action.data,
                });
            }
        } else {
            // We must have an error
            yield put({
                type: "SET_ERROR",
                errorType: "CLOUD_DATA",
                message: updateDataResponse.message,
                retryAction: {
                    type: "updateData",
                    data: {
                        nextActionType: action.nextActionType,
                        node: action.node,
                        data: action.data,
                    },
                },
            });
        }
    }
}

export function* setData(action) {
    const setDataResponse = yield call(CloudData.setData, action);
    if (__DEV__) {
        console.log("setDataResponse", setDataResponse);
    }

    if (setDataResponse) {
        if (setDataResponse.success) {
            if (action.nextActionType) {
                yield put({
                    type: action.nextActionType,
                    node: action.node,
                    data: action.data,
                });
            }
        } else {
            // We must have an error
            yield put({
                type: "SET_ERROR",
                errorType: "CLOUD_DATA",
                message: setDataResponse.message,
                retryAction: {
                    type: "setData",
                    data: {
                        nextActionType: action.nextActionType,
                        node: action.node,
                        data: action.data,
                    },
                },
            });
        }
    }
}

export function* pushData(action) {
    const pushDataResponse = yield call(CloudData.pushData, action);
    if (__DEV__) {
        console.log("pushDataResponse", pushDataResponse);
    }

    if (pushDataResponse) {
        if (pushDataResponse.success) {
            if (action.nextActionType) {
                yield put({
                    type: action.nextActionType,
                    node: action.node,
                    data: action.data,
                });
            }
        } else {
            // We must have an error
            yield put({
                type: "SET_ERROR",
                errorType: "CLOUD_DATA",
                message: pushDataResponse.message,
                retryAction: {
                    type: "pushData",
                    data: {
                        nextActionType: action.nextActionType,
                        node: action.node,
                        data: action.data,
                    },
                },
            });
        }
    }
}

export function* deleteData(action) {
    const deleteDataResponse = yield call(CloudData.deleteData, action);
    if (__DEV__) {
        console.log("deleteDataResponse", deleteDataResponse);
    }

    if (deleteDataResponse) {
        if (deleteDataResponse.success) {
            if (action.nextActionType) {
                yield put({
                    type: action.nextActionType,
                    node: action.node,
                });
            }
        } else {
            // We must have an error
            yield put({
                type: "SET_ERROR",
                errorType: "CLOUD_DATA",
                message: deleteDataResponse.message,
                retryAction: {
                    type: "deleteData",
                    data: {
                        nextActionType: action.nextActionType,
                        node: action.node,
                        data: action.data,
                    },
                },
            });
        }
    }
}
