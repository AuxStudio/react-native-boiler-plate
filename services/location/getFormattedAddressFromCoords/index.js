import Geocoder from 'react-native-geocoder';

import utils from '../../../utils';

export default function getFormattedAddressFromCoords(lat, lng) {
  return new Promise((resolve, reject) => {
    utils.app.log('start getFormattedAddressFromCoords', { lat, lng });

    Geocoder.geocodePosition({
      lat,
      lng,
    })
      .then((data) => {
        const response = data && { data };
        utils.app.log('end getFormattedAddressFromCoords', response);
        resolve(response);
      })
      .catch((error) => {
        utils.app.log('end getFormattedAddressFromCoords', { error });

        reject(utils.app.createError(error));
      });
  });
}
