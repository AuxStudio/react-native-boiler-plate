import Geocoder from 'react-native-geocoder';
import utils from '../../utils';

export default function getFormattedAddressFromCoords(lat, lng) {
  return new Promise((resolve, reject) => {
    utils.log('start getFormattedAddressFromCoords', { lat, lng });

    Geocoder.geocodePosition({
      lat,
      lng,
    })
      .then((data) => {
        utils.log('end getFormattedAddressFromCoords', { data });

        resolve(data);
      })
      .catch((error) => {
        utils.log('end getFormattedAddressFromCoords', { error });

        reject(utils.createError(error));
      });
  });
}
