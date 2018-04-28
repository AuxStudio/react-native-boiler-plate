import Geocoder from 'react-native-geocoder';

export default function getFormattedAddressFromCoordinates(action) {
  return new Promise((resolve) => {
    Geocoder.geocodePosition(action.meta.coords)
      .then((data) => {
        resolve({
          payload: data,
        });
      })
      .catch((error) => {
        resolve({
          payload: new Error(error),
          error: true,
        });
      });
  });
}
