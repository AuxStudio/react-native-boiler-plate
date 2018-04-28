import Geocoder from 'react-native-geocoder';

export default function getFormattedAddressFromCoordinates(action) {
  return new Promise((resolve, reject) => {
    Geocoder.geocodePosition(action.meta.coords)
      .then((data) => {
        resolve({
          payload: data,
        });
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
