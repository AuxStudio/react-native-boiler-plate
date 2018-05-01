import ImagePicker from 'react-native-image-picker';
import utils from '../../utils';

export default function showImagePicker() {
  return new Promise((resolve, reject) => {
    utils.log('start showImagePicker');

    ImagePicker.showImagePicker(null, ({ uri, error }) => {
      if (error) {
        utils.log('end showImagePicker', { error });

        reject(utils.createError(error));
      } else {
        utils.log('end showImagePicker', { uri });

        resolve(uri);
      }
    });
  });
}
