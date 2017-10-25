import { call, put } from "redux-saga/effects";

import Geolocation from "../geolocation/index";

export function* getUserLocation(action) {
    const userCoordinatesResponse = yield call(Geolocation.getUserCoordinates);
    console.log("userCoordinatesResponse", userCoordinatesResponse);

    if (userCoordinatesResponse.success) {
        const userSuburbResponse = yield call(
            Geolocation.getUserSuburb,
            userCoordinatesResponse.message
        );
        console.log("userSuburbResponse", userSuburbResponse);

        if (userSuburbResponse.success) {
            yield put({
                type: "SET_CURRENT_LOCATION",
                currentLocation: userSuburbResponse.message,
            });
        } else {
            yield put({
                type: "SET_ERROR",
                errorType: "GEOLOCATION",
                message: "Geolocation services not available.",
                retryAction: {
                    type: "getUserLocation",
                },
            });
        }
    } else {
        yield put({
            type: "SET_ERROR",
            errorType: "GEOLOCATION",
            message: "Geolocation services not available.",
            retryAction: {
                type: "getUserLocation",
            },
        });
    }
}
