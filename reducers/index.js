import utilities from "../utilities";
import initialState from "./initialState";

export default function(state = initialState, action) {
    switch (action.type) {
        /* AUTH */
        case "UPDATE_USER_EMAIL":
            new_state = utilities.cloneObject(state);
            new_state.userData.profile.userEmail = action.value;
            return new_state;

        case "UPDATE_USER_PASSWORD":
            new_state = utilities.cloneObject(state);
            new_state.userAuth.userPassword = action.value;
            return new_state;

        case "SIGN_IN_USER":
            new_state = utilities.cloneObject(state);
            new_state.userAuth.authenticated = true;
            new_state.userAuth.anonymous = action.anonymous;

            new_state.userAuth.uid = action.uid;
            new_state.userData.profile.userEmail = action.userEmail;
            new_state.userData.profile.userName = action.userName;
            new_state.userData.profile.userPhotoURL = action.userPhotoURL;

            return new_state;

        case "SIGN_OUT_USER":
            new_state = utilities.cloneObject(state);
            new_state.userAuth = initialState.userAuth;
            new_state.userData = initialState.userData;

            return new_state;

        /* APP */
        case "TOGGLE_LOADING":
            new_state = utilities.cloneObject(state);
            new_state.appState.loading = !new_state.appState.loading;
            return new_state;

        /*
			SUCCESS/ERROR MESSAGES
        */
        case "SET_ERROR":
            new_state = utilities.cloneObject(state);
            new_state.appState.error = {
                ...action,
            };

            return new_state;

        case "RESET_ERROR":
            new_state = utilities.cloneObject(state);
            new_state.appState.error = initialState.appState.error;

            return new_state;

        /* DATA */
        case "SET_USER_LOCATION":
            new_state = utilities.cloneObject(state);
            new_state.appState.userLocation = action.userLocation;
            return new_state;

        case "SET_TEMPORARY_IMAGE":
            new_state = utilities.cloneObject(state);
            new_state.appState.temporaryImage = action.image;
            return new_state;

        case "CLEAR_TEMPORARY_IMAGE":
            new_state = utilities.cloneObject(state);
            new_state.appState.temporaryImage = null;
            return new_state;

        case "SET_USER_PHOTO":
            new_state = utilities.cloneObject(state);
            new_state.userData.profile.userPhotoURL = action.userPhotoURL;
            return new_state;

        case "SET_NETWORK_INFO":
            new_state = utilities.cloneObject(state);
            new_state.appData.networkInfo = action.data;
            return new_state;

        /* APP */
        case "SET_DATA":
            new_state = utilities.cloneObject(state);
            new_state.appData[action.node] = action.data;
            new_state.appState.loading = false;
            new_state.appState.refreshing = false;
            return new_state;

        default:
            return state;
    }
}
