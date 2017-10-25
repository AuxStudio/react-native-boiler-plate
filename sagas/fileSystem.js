import { call, put } from "redux-saga/effects";

import FileSystem from "../fileSystem/index";

export function* deleteFile(action) {
    const deleteFileResponse = yield call(FileSystem.deleteFile, action);
    console.log("deleteFileResponse", deleteFileResponse);

    if (deleteFileResponse.success) {
        // Do nothing
    } else {
        yield put({
            type: "SET_ERROR",
            errorType: "FILE_SYSTEM",
            message: deleteFileResponse.message,
        });
    }
}
