import RNFS from "react-native-fs";

const response = {
    success: null,
    message: null,
};

export default class FileSystem {
    static createDirectory(dir) {
        return new Promise(resolve => {
            RNFS.mkdir(dir)
                .then(() => {
                    response = {
                        success: true,
                        message: dir,
                    };

                    resolve(response);
                })
                .catch(error => {
                    response = {
                        success: false,
                        message: error.message,
                    };

                    resolve(response);
                });
        });
    }

    static moveFile(action) {
        return new Promise(resolve => {
            RNFS.moveFile(action.path, action.outputPath)
                .then(() => {
                    response = {
                        success: true,
                        message: action.outputPath,
                    };

                    resolve(response);
                })
                .catch(error => {
                    response = {
                        success: false,
                        message: error.message,
                    };

                    resolve(response);
                });
        });
    }

    static copyFile(action) {
        return new Promise(resolve => {
            RNFS.copyFile(action.path, action.outputPath)
                .then(() => {
                    response = {
                        success: true,
                        message: action.outputPath,
                    };

                    resolve(response);
                })
                .catch(error => {
                    response = {
                        success: false,
                        message: error.message,
                    };

                    resolve(response);
                });
        });
    }

    static deleteFile(action) {
        return new Promise(resolve => {
            RNFS.unlink(action.path)
                .then(() => {
                    response = {
                        success: true,
                        message: action.path,
                    };

                    resolve(response);
                })
                .catch(error => {
                    response = {
                        success: false,
                        message: error.message,
                    };

                    resolve(response);
                });
        });
    }
}
