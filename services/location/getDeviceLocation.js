export default function getDeviceLocation() {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log('Getting device location');
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve(coords);
      },
      (error) => {
        reject(new Error(error));
      },
    );
  });
}
