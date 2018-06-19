// NOTE: Unable to mock navigator.geolocation so I am unable to write tests for this function

import utils from '../../../utils';

export default function getDeviceLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const response = { coords };
        resolve(response);
      },
      (error) => {
        reject(utils.app.createError(error));
      },
    );
  });
}
