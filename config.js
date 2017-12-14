const config = {};

config.appDetails = {
    name: "PROJECT_NAME",
    version: "0.0.1",
    url: null,
    developer: {
        name: "Shaun Saker",
        email: "info@shaunsaker.com",
    },
};

config.messages = {
    auth: {
        general: {
            success: false,
            message:
                "We were unable to sign you in. Please check your connection and try again",
        },
        anonymous: {
            success: false,
            message: "We were unable to sign you in anonymously",
        },
        email: {
            success: false,
            message: "We were unable to sign you in with email",
        },
        Facebook: {
            success: false,
            message: "We were unable to sign you in with Facebook",
        },
        Google: {
            success: false,
            message: "We were unable to sign you in with Google",
        },
        passwordReset: {
            success: false,
            message: "We were unable to send you a password reset request",
        },
        passwordResetSuccess: {
            success: false,
            message: "We sent your password reset request successfully",
        },
        passwordLength: {
            success: false,
            message: "Password should be at least 6 characters long",
        },
        signOut: {
            success: false,
            message: "We were unable to sign you out",
        },
    },
    data: {
        get: {
            success: false,
            message: "We could not get your data",
        },
        getSuccess: {
            success: true,
            message: "We fetched your data successfully",
        },
        update: {
            success: false,
            message: "We could not update your data",
        },
        updateSuccess: {
            success: true,
            message: "We updated your data successfully",
        },
        push: {
            success: false,
            message: "We could not push your data",
        },
        pushSuccess: {
            success: false,
            message: "We pushed your data successfully",
        },
        delete: {
            success: false,
            message: "We could not delete your data",
        },
        deleteSuccess: {
            success: false,
            message: "We deleted your data successfully",
        },
    },
    fileSystem: {
        delete: {
            success: false,
            message: "We could not delete your file",
        },
        copy: {
            success: false,
            message: "We could not copy your file",
        },
        createDirectory: {
            success: false,
            message: "We could not create a directory for your file",
        },
    },
    geolocation: {
        location: {
            success: false,
            message: "We could not get your location",
        },
    },
    images: {
        crop: {
            success: false,
            message: "We could not crop your image",
        },
        resize: {
            success: false,
            message: "We could not resize your image",
        },
    },
};

config.testing = {
    dimensions: false,
    disableUserAuth: true,
};

config.firebase = {
    debug: false,
    persistence: true,
};

config.images = {
    maxImageWidth: 100,
    imagePickerOptions: {
        mediaType: "photo",
        noData: true, // don't attach base64 data - greatly improves performance
        storageOptions: {
            skipBackup: true, // don't backup to iOS cloud
        },
    },
    imageResizerOptions: [
        "JPEG", // format
        100, // quality
        0, // rotation
    ],
    firebaseStorageOptions: {
        contentType: "image/jpeg",
        contentEncoding: "base64",
    },
};

config.voiceNotes = {
    format: "mp4",
};

config.googleSignIn = {
    webClientId:
        "939952029165-7q23777tan1lu8pveoo1hgsn92gk1dej.apps.googleusercontent.com",
    iosClientId: "",
    offlineAccess: false,
};

export default config;
