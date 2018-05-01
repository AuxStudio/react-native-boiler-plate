export default function post(url, headers, data) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(
        `HTTP post to: ${url}, headers: ${JSON.stringify(headers)}, data: ${JSON.stringify(
          headers,
        )}`,
      );
    }

    fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
