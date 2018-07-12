import { Actions } from 'react-native-router-flux';

import utils from '../../../utils';

export default function navigateTo(page, props, shouldReset, shouldReplace) {
  return new Promise((resolve, reject) => {
    try {
      if (shouldReset) {
        Actions.reset(page, props);
      } else if (shouldReplace) {
        Actions.replace(page, props);
      } else {
        Actions[page](props);
      }

      resolve();
    } catch (error) {
      reject(utils.app.createError(error));
    }
  });
}
