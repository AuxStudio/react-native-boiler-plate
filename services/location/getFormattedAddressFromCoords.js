import Geocoder from 'react-native-geocoder';

export default function getFormattedAddressFromCoords(coords) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Getting formatted address from coords: ${JSON.stringify(coords)}`);
    }

    Geocoder.geocodePosition(coords)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
