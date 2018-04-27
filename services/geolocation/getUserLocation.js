export default function getUserLocation() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({
          payload: coords,
        });
      },
      (error) => {
        resolve({
          payload: error,
          error: true,
        });
      },
    );
  });
}
