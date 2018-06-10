import utils from '../../utils';

export default function getDeviceLocation() {
  return new Promise((resolve, reject) => {
    utils.app.log('start getDeviceLocation');

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const response = { coords };
        utils.app.log('end getDeviceLocation', response);
        resolve(response);
      },
      (error) => {
        utils.app.log('end getDeviceLocation', { error });

        reject(utils.app.createError(error));
      },
    );
  });
}
