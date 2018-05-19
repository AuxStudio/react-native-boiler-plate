import utils from '../../utils';

export default function getDeviceLocation() {
  return new Promise((resolve, reject) => {
    utils.log('start getDeviceLocation');

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const response = { coords };
        utils.log('end getDeviceLocation', response);
        resolve(response);
      },
      (error) => {
        utils.log('end getDeviceLocation', { error });

        reject(utils.createError(error));
      },
    );
  });
}
