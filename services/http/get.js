export default function get(url) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`HTTP get at: ${url}`);
    }

    fetch(url)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
