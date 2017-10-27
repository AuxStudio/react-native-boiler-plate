const initialState = {
    userAuth: {
        authenticated: null,
        uid: null,

        anonymous: null,
        redirectToSignInPage: null,

        userPassword: null,
    },
    appState: {
        loading: false,

        error: {
            type: null,
            message: null,
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
        profile: {
            userName: null,
            userEmail: null,
            userLocation: null,
            userPhotoUrl: null,
        },
    },
};

export default initialState;
