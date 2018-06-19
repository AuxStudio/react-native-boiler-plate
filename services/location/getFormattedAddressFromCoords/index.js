import Geocoder from 'react-native-geocoder';

import utils from '../../../utils';

export default function getFormattedAddressFromCoords(lat, lng) {
  return new Promise((resolve, reject) => {
    Geocoder.geocodePosition({
      lat,
      lng,
    })
      .then((data) => {
        const response = data && { data };
        resolve(response);
      })
      .catch((error) => {
        reject(utils.app.createError(error));
      });
  });
}
