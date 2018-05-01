import Geocoder from 'react-native-geocoder';

export default function getFormattedAddressFromCoords(lat, lng) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Getting formatted address from coords: ${lat}, ${lng}`);
    }

    Geocoder.geocodePosition({
      lat,
      lng,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
