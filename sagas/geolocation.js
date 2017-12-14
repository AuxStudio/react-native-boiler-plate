import { call, put } from "redux-saga/effects";

import config from "../config";
import Geolocation from "../geolocation/index";

export function* getUserLocation(action) {
    const userCoordinatesResponse = yield call(Geolocation.getUserLocation);
    console.log("userCoordinatesResponse", userCoordinatesResponse);

    if (userCoordinatesResponse.success) {
        yield put({
            type: "SET_USER_LOCATION",
            userLocation: userCoordinatesResponse.message, // lat and lng position
        });
    } else {
        yield put({
            type: "SET_ERROR",
            errorType: "GEOLOCATION",
            success: config.geolocation.location.type,
            message: config.geolocation.location.message,
            retryAction: {
                type: "getUserLocation",
            },
        });
    }
}

export function* getFormattedAddressFromCoordinates(action) {
    const getLocalityFromCoordinatesResponse = yield call(
        Geolocation.getFormattedAddressFromCoordinates,
        action.coordinates
    );
    console.log(
        "getLocalityFromCoordinatesResponse",
        getLocalityFromCoordinatesResponse.success // message is too long
    );

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
            success: config.geolocation.location.type,
            message: config.geolocation.location.message,
            retryAction: {
                type: "getFormattedAddressFromCoordinates",
                coordinates: action.coordinates,
            },
        });
    }
}
