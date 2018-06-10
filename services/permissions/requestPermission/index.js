import Permissions from 'react-native-permissions';

import utils from '../../../utils';

export default function requestPermission(permission) {
  return new Promise((resolve, reject) => {
    utils.app.log('start requestPermission', { permission });

    Permissions.request(permission)
      .then((message) => {
        const response = message && { message };
        utils.app.log('end requestPermission', response);
        resolve(response);
      })
      .catch((error) => {
        utils.app.log('end requestPermission', { error });
        reject(utils.app.createError(error));
      });
  });
}
