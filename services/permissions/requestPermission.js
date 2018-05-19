import Permissions from 'react-native-permissions';
import utils from '../../utils';

export default function requestPermission(permission) {
  return new Promise((resolve, reject) => {
    utils.log('start requestPermission', { permission });

    Permissions.request(permission)
      .then((message) => {
        const response = message && { message };
        utils.log('end requestPermission', response);
        resolve(response);
      })
      .catch((error) => {
        utils.log('end requestPermission', { error });
        reject(utils.createError(error));
      });
  });
}
