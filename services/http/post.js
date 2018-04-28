export default function post(action) {
  return new Promise((resolve, reject) => {
    fetch(action.meta.url, {
      method: 'POST',
      headers: action.meta.headers,
      body: JSON.stringify(action.meta.params),
    })
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
