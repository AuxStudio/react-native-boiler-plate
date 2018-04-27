import { call, put } from 'redux-saga/effects';

import config from '../config';
import Location from '../Location/index';

export function* getUserLocation(action) {
  const userCoordinatesResponse = yield call(Location.getUserLocation);
  if (__DEV__) {
    console.log('userCoordinatesResponse', userCoordinatesResponse);
  }

  if (userCoordinatesResponse.success) {
    yield put({
      type: 'SET_DEVICE_LOCATION',
      userLocation: userCoordinatesResponse.message, // lat and lng position
    });
  } else {
    yield put({
      type: 'SET_MESSAGE',
      errorType: 'Location',
      message: 'Unable to retrieve your location',
      iconName: 'error-outline',
      action: {
        type: 'getUserLocation',
        text: 'RETRY',
      },
    });
  }
}

export function* getFormattedAddressFromCoordinates(action) {
  const getLocalityFromCoordinatesResponse = yield call(
    Location.getFormattedAddressFromCoordinates,
    action.coordinates,
  );
  if (__DEV__) {
    console.log(
      'getLocalityFromCoordinatesResponse',
      getLocalityFromCoordinatesResponse.success, // message is too long
    );
  }

  if (getLocalityFromCoordinatesResponse.success) {
    yield put({
      type: action.nextActionType,
      locality: getLocalityFromCoordinatesResponse.message[0].formattedAddress,
    });
  } else {
    yield put({
      type: 'SET_MESSAGE',
      errorType: 'Location_LOCALITY',
      message: config.Location.location.message,
      iconName: 'error-outline',
      action: {
        type: 'getFormattedAddressFromCoordinates',
        text: 'RETRY',
        data: {
          coordinates: action.coordinates,
        },
      },
    });
  }
}
