const initialState = {
    userAuth: {
        authenticated: null,
        uid: null,
        anonymous: null,
        userPassword: null,
    },
    appState: {
        loading: true,

        error: {
            type: null,
            message: null,
            success: null,
        },
        retryAction: {
            type: null,
            data: null,
        },
        userLocation: null,
        temporaryImage: null,
    },
    appData: {
        app: null,
        users: null,
    },
    userData: {
        settings: null,
        profile: {
            userName: null,
            userEmail: null,
            userLocation: null,
            userPhotoURL: null,
        },
    },
};

export default initialState;
