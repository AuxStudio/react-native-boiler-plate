import Geocoder from 'react-native-geocoder';

export default function getFormattedAddressFromCoords(action) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Getting formatted address from coords: ${JSON.stringify(action.payload)}`);
    }

    Geocoder.geocodePosition(action.payload.coords)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
