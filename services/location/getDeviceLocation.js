export default function getDeviceLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({
          payload: coords,
        });
      },
      (error) => {
        reject(new Error(error));
      },
    );
  });
}
