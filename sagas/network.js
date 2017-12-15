import { call, put, all } from "redux-saga/effects";

import Network from "../network";

export function* getConnectionInfo(action) {
    const getConnectionInfoResponse = yield call(
        Network.getConnectionInfo,
        action
    );
    console.log("getConnectionInfoResponse", getConnectionInfoResponse.success);

    if (getConnectionInfoResponse) {
        if (getConnectionInfoResponse.success) {
            if (getConnectionInfoResponse.message.type === "none") {
                yield put({
                    type: "SET_ERROR",
                    errorType: "NETWORK",
                    message: "Oh dear, network error. Please try again.",
                    retryAction: {
                        type: "getConnectionInfo",
                    },
                });
            } else {
                // Do nothing (hasNetwork)
            }
        } else {
            // We must have an error
            yield put({
                type: "SET_ERROR",
                errorType: "NETWORK",
                message: "Oh dear, network error. Please try again.",
                retryAction: {
                    type: "getConnectionInfo",
                    data: {
                        nextActionType: "SET_NETWORK_INFO",
                        data: getConnectionInfoResponse.message.type,
                    },
                },
            });
        }
    }
}
