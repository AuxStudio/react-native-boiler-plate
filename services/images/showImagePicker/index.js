import ImagePicker from 'react-native-image-picker';

import utils from '../../../utils';
import config from '../../../config';

export default function showImagePicker() {
  return new Promise((resolve, reject) => {
    ImagePicker.showImagePicker(config.images.imagePickerOptions, ({ uri, error }) => {
      if (error) {
        reject(utils.app.createError(error));
      } else {
        const response = uri && { uri }; // if the user cancels, there is no response
        resolve(response);
      }
    });
  });
}
