import { Actions } from 'react-native-router-flux';

import utils from '../../../utils';

export default function pop() {
  return new Promise((resolve, reject) => {
    try {
      Actions.pop();

      resolve();
    } catch (error) {
      reject(utils.app.createError(error));
    }
  });
}
