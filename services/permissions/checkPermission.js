import Permissions from 'react-native-permissions';
import utils from '../../utils';

export default function checkPermission(permission) {
  return new Promise((resolve, reject) => {
    utils.log('start checkPermission', { permission });

    Permissions.check(permission)
      .then((message) => {
        const response = message && { message };
        utils.log('end checkPermission', response);
        resolve(response);
      })
      .catch((error) => {
        utils.log('end checkPermission', { error });
        reject(utils.createError(error));
      });
  });
}
