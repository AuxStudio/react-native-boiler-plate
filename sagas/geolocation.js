import { call, put } from "redux-saga/effects";

import config from "../config";
import Geolocation from "../geolocation/index";

export function* getUserLocation(action) {
    const userCoordinatesResponse = yield call(Geolocation.getUserLocation);
    if (__DEV__) {
        console.log("userCoordinatesResponse", userCoordinatesResponse);
    }

    if (userCoordinatesResponse.success) {
        yield put({
            type: "SET_USER_LOCATION",
            userLocation: userCoordinatesResponse.message, // lat and lng position
        });
    } else {
        yield put({
            type: "SET_ERROR",
            errorType: "GEOLOCATION",
            message: "Unable to retrieve your location",
            iconName: "error-outline",
            action: {
                type: "getUserLocation",
                text: "RETRY",
            },
        });
    }
}

export function* getFormattedAddressFromCoordinates(action) {
    const getLocalityFromCoordinatesResponse = yield call(
        Geolocation.getFormattedAddressFromCoordinates,
        action.coordinates,
    );
    if (__DEV__) {
        console.log(
            "getLocalityFromCoordinatesResponse",
            getLocalityFromCoordinatesResponse.success, // message is too long
        );
    }

    if (getLocalityFromCoordinatesResponse.success) {
        yield put({
            type: action.nextActionType,
            locality:
                getLocalityFromCoordinatesResponse.message[0].formattedAddress,
        });
    } else {
        yield put({
            type: "SET_ERROR",
            errorType: "GEOLOCATION_LOCALITY",
            message: config.geolocation.location.message,
            iconName: "error-outline",
            action: {
                type: "getFormattedAddressFromCoordinates",
                text: "RETRY",
                data: {
                    coordinates: action.coordinates,
                },
            },
        });
    }
}
