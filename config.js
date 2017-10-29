import { Easing } from "react-native";

const config = {};

config.app = {
    name: "PROJECT_NAME",
    version: "0.0.1",
    url: null,
    developer: {
        name: "Shaun Saker",
        email: "info@shaunsaker.com",
    },
};

config.splash = {
    disableLoadingDelay: true,
    disableUserAuth: false,
    minimumDisplayDuration: 1, // seconds
};

config.testing = {
    dimensions: false,
};

config.firebase = {
    debug: false,
    persistence: true,
};

config.animation = {
    duration: {
        short: 250,
        long: 750,
    },
    easing: Easing.gentle,
};

config.modal = {
    animation: "slide",
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
