import { ImageEditor } from "react-native";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";

import config from "../config";

const response = {
    success: null,
    message: null,
};

export default class Photos {
    static takePhoto() {
        return new Promise(resolve => {
            ImagePicker.launchCamera(
                config.images.imagePickerOptions,
                imagePickerResponse => {
                    if (!imagePickerResponse.didCancel) {
                        response = {
                            success: true,
                            message: imagePickerResponse,
                        };
                        resolve(response);
                    } else {
                        response = {
                            success: false,
                            message: null,
                        };
                        resolve(response);
                    }
                }
            );
        });
    }

    static choosePhoto() {
        return new Promise(resolve => {
            ImagePicker.launchImageLibrary(
                config.images.imagePickerOptions,
                imagePickerResponse => {
                    if (!imagePickerResponse.didCancel) {
                        response = {
                            success: true,
                            message: imagePickerResponse,
                        };
                        resolve(response);
                    } else {
                        response = {
                            success: false,
                            message: null,
                        };
                        resolve(response);
                    }
                }
            );
        });
    }

    static resizeImage(action) {
        return new Promise(resolve => {
            let portrait = action.height > action.width;

            const imageResizerOptions = [
                action.uri, // uri to image
                portrait ? action.maxWidth : action.maxWidth * 2, // maxWidth
                portrait ? action.maxWidth * 2 : action.maxWidth, // maxHeight
                ...config.images.imageResizerOptions, // format, quality, rotation
            ];

            ImageResizer.createResizedImage(...imageResizerOptions)
                .then(resizedImageUri => {
                    response = {
                        success: true,
                        message: {
                            uri: resizedImageUri,
                            portrait: portrait,
                            width: action.width,
                            height: action.height,
                        },
                    };
                    resolve(response);
                })
                .catch(error => {
                    response = {
                        success: false,
                        message: error,
                    };
                    resolve(response);
                });
        });
    }

    static cropImage(action) {
        return new Promise(resolve => {
            const offsetX = action.portrait
                ? 0
                : action.maxWidth / 2 * action.width / action.height -
                  action.maxWidth / 2;
            const offsetY = action.portrait
                ? action.maxWidth / 2 * action.height / action.width -
                  action.maxWidth / 2
                : 0;

            const cropOptions = {
                offset: {
                    x: offsetX,
                    y: offsetY,
                },
                size: {
                    width: action.maxWidth,
                    height: action.maxWidth,
                },
            };

            ImageEditor.cropImage(
                action.uri,
                cropOptions,
                uri => {
                    response = {
                        success: true,
                        message: uri,
                    };
                    resolve(response);
                },
                error => {
                    response = {
                        success: false,
                        message: error,
                    };
                    resolve(response);
                }
            );
        });
    }
}
