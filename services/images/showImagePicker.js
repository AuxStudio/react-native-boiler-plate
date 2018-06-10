import ImagePicker from 'react-native-image-picker';
import utils from '../../utils';

export default function showImagePicker() {
  return new Promise((resolve, reject) => {
    utils.app.log('start showImagePicker');

    ImagePicker.showImagePicker(null, ({ uri, error }) => {
      if (error) {
        utils.app.log('end showImagePicker', { error });
        reject(utils.app.createError(error));
      } else {
        const response = uri && { uri }; // if the user cancels, there is no response
        utils.app.log('end showImagePicker', response);

        resolve(response);
      }
    });
  });
}
