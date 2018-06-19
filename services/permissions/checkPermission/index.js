import Permissions from 'react-native-permissions';

import utils from '../../../utils';

export default function checkPermission(permission) {
  return new Promise((resolve, reject) => {
    if (permission) {
      utils.app.log('start checkPermission', { permission });

      Permissions.check(permission)
        .then((message) => {
          const response = message && { message };
          utils.app.log('end checkPermission', response);
          resolve(response);
        })
        .catch((error) => {
          utils.app.log('end checkPermission', { error });
          reject(utils.app.createError(error));
        });
    } else {
      reject(new Error('Permission type is required'));
    }
  });
}
