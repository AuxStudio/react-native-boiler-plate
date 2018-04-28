export default function get(action) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`HTTP get at: ${action.payload.url}`);
    }

    fetch(action.payload.url)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
