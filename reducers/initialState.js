const initialState = {
    userAuth: {
        authenticated: null,
        uid: null,

        firstTimeUser: null,
        anonymous: null,
        redirectToWelcomePage: null,

        userPassword: null,
    },
    appState: {
        loading: false,

        error: {
            type: null,
            message: null,
            success: null, // if true, indicates success message
        },
        retryAction: {
            type: null,
            data: null,
        },
    },
    appData: {
        currentLocation: null,
        temporaryImage: null,
    },
    userData: {
        settings: {},
        profile: {
            userName: null,
            userEmail: null,
            userLocation: null,
            userPhotoUrl: null,
        },
    },
};

export default initialState;
