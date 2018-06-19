import ImagePicker from 'react-native-image-picker';

import utils from '../../../utils';

export default function showImagePicker() {
  return new Promise((resolve, reject) => {
    ImagePicker.showImagePicker(null, ({ uri, error }) => {
      if (error) {
        reject(utils.app.createError(error));
      } else {
        const response = uri && { uri }; // if the user cancels, there is no response
        resolve(response);
      }
    });
  });
}
