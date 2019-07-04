import Geocoder from 'react-native-geocoder';

import { app } from '../../../utils';

export default function getFormattedAddressFromCoords(lat, lng) {
  return new Promise((resolve, reject) => {
    if (lat && lng) {
      Geocoder.geocodePosition({
        lat,
        lng,
      })
        .then((data) => {
          const response = data && { data };
          resolve(response);
        })
        .catch((error) => {
          reject(app.createError(error));
        });
    } else if (!lat) {
      reject(new Error('Latitude is required'));
    } else {
      reject(new Error('Longitude is required'));
    }
  });
}
