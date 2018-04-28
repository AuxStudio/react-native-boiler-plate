export default function get(action) {
  return new Promise((resolve, reject) => {
    fetch(action.meta.url)
      .then((response) => {
        resolve({
          payload: response,
        });
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
