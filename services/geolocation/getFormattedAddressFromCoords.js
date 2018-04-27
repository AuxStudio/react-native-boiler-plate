import Geocoder from 'react-native-geocoder';

export default function getFormattedAddressFromCoordinates(coordinates) {
  return new Promise((resolve) => {
    Geocoder.geocodePosition(coordinates)
      .then((data) => {
        resolve({
          payload: data,
        });
      })
      .catch((error) => {
        resolve({
          payload: error,
          error: true,
        });
      });
  });
}
