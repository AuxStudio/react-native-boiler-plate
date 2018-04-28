export default function post(action) {
  return new Promise((resolve) => {
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
        resolve({
          payload: new Error(error),
          error: true,
        });
      });
  });
}
