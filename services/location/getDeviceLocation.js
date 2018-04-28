export default function getDeviceLocation() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({
          payload: coords,
        });
      },
      (error) => {
        resolve({
          payload: new Error(error),
          error: true,
        });
      },
    );
  });
}
