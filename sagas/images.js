import { call, put } from "redux-saga/effects";
import RNFS from "react-native-fs";

import Images from "../images/index";
import FileSystem from "../fileSystem/index";

import config from "../config";
import utilities from "../utilities";

export function* handleImage(action) {
    let imagePickerResponse;

    if (action.option === "Take a Photo") {
        imagePickerResponse = yield call(Images.takePhoto);
        if (__DEV__) {
            console.log("imagePickerResponse", imagePickerResponse);
        }
    } else {
        // Choose a Photo
        imagePickerResponse = yield call(Images.choosePhoto);
        if (__DEV__) {
            console.log("imagePickerResponse", imagePickerResponse);
        }
    }

    if (imagePickerResponse.success) {
        const appPhotosDir =
            RNFS.PicturesDirectoryPath + "/" + config.appDetails.name;
        if (__DEV__) {
            console.log("appPhotosDir:", appPhotosDir);
        }

        const createDirectoryResponse = yield call(
            FileSystem.createDirectory,
            appPhotosDir,
        );
        if (__DEV__) {
            console.log("createDirectoryResponse", createDirectoryResponse);
        }

        if (createDirectoryResponse.success) {
            const outputPath =
                createDirectoryResponse.message +
                "/" +
                utilities.getFileName(imagePickerResponse.message.path);
            if (__DEV__) {
                console.log("Output path: ", outputPath);
            }

            const transferFileOptions = {
                path: imagePickerResponse.message.path,
                outputPath,
            };
            let transferFileResponse; // move or copy response

            if (action.option === "Take a Photo") {
                transferFileResponse = yield call(
                    FileSystem.moveFile,
                    transferFileOptions,
                );
                if (__DEV__) {
                    console.log("transferFileResponse", transferFileResponse);
                }
            } else {
                // Copy the file if it was chosen from an existing directory
                transferFileResponse = yield call(
                    FileSystem.copyFile,
                    transferFileOptions,
                );
                if (__DEV__) {
                    console.log("transferFileResponse", transferFileResponse);
                }
            }

            if (transferFileResponse.success) {
                let maxWidth = action.maxWidth
                    ? action.maxWidth
                    : config.images.maxImageWidth;

                const imageResizerOptions = {
                    uri: "file:" + transferFileResponse.message,
                    width: imagePickerResponse.message.width,
                    height: imagePickerResponse.message.height,
                    maxWidth,
                };

                const imageResizerResponse = yield call(
                    Images.resizeImage,
                    imageResizerOptions,
                );
                if (__DEV__) {
                    console.log("imageResizerResponse", imageResizerResponse);
                }

                if (imageResizerResponse.success) {
                    const imageCropperOptions = {
                        uri: imageResizerResponse.message.uri,
                        portrait: imageResizerResponse.message.portrait,
                        width: imageResizerResponse.message.width,
                        height: imageResizerResponse.message.height,
                        maxWidth,
                    };

                    const imageCropperResponse = yield call(
                        Images.cropImage,
                        imageCropperOptions,
                    );
                    if (__DEV__) {
                        console.log(
                            "imageCropperResponse",
                            imageCropperResponse,
                        );
                    }

                    if (imageCropperResponse.success) {
                        const croppedImagePath = imageCropperResponse.message.replace(
                            "file:",
                            "",
                        );
                        const croppedImageOutputPath = utilities.appendStringToFileName(
                            transferFileResponse.message,
                            "-cropped",
                        );

                        const moveCroppedFileOptions = {
                            path: croppedImagePath,
                            outputPath: croppedImageOutputPath,
                        };

                        const moveCroppedFileResponse = yield call(
                            FileSystem.moveFile,
                            moveCroppedFileOptions,
                        );
                        if (__DEV__) {
                            console.log(
                                "moveCroppedFileResponse",
                                moveCroppedFileResponse,
                            );
                        }

                        if (moveCroppedFileResponse.success) {
                            const image = {
                                fullSize:
                                    "file:" + transferFileResponse.message,
                                cropped:
                                    "file:" + moveCroppedFileResponse.message,
                                uid: utilities.createUID(),
                            };

                            yield put({
                                type: "SET_TEMPORARY_IMAGE",
                                image,
                            });
                        } else {
                            yield put({
                                type: "SET_ERROR",
                                errorType: "IMAGE",
                                message: "Failed to crop image",
                                iconName: "error-outline",
                            });
                        }
                    } else {
                        yield put({
                            type: "SET_ERROR",
                            errorType: "IMAGE",
                            message: "Failed to crop image",
                            iconName: "error-outline",
                        });
                    }
                } else {
                    yield put({
                        type: "SET_ERROR",
                        errorType: "IMAGE",
                        message: "Failed to resize image",
                        iconName: "error-outline",
                    });
                }
            } else {
                yield put({
                    type: "SET_ERROR",
                    errorType: "IMAGE",
                    message: "Failed to copy image",
                    iconName: "error-outline",
                });
            }
        } else {
            yield put({
                type: "SET_ERROR",
                errorType: "IMAGE",
                message: "Failed to copy image",
                iconName: "error-outline",
            });
        }
    } else {
        // Do nothing, user cancelled
    }
}
