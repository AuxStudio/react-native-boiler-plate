export default function post(action) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`HTTP post to: ${action.payload.url}, ${JSON.stringify(action.payload)}`);
    }

    fetch(action.payload.url, {
      method: 'POST',
      headers: action.payload.headers,
      body: JSON.stringify(action.payload.params),
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
