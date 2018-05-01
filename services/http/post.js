export default function post(url, headers, body) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(
        `HTTP post to: ${url}, headers: ${JSON.stringify(headers)}, data: ${JSON.stringify(body)}`,
      );
    }

    fetch(url, {
      method: 'POST',
      headers,
      body,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
