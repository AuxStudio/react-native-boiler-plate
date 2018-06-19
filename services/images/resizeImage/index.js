import ImageResizer from 'react-native-image-resizer';

import config from '../../../config';
import utils from '../../../utils';

export default function resizeImage(imageURI) {
  return new Promise((resolve, reject) => {
    const imageResizerOptions = [
      imageURI, // uri to image
      ...config.images.imageResizerOptions, // maxWidth, maxHeight, format, quality, rotation
    ];

    ImageResizer.createResizedImage(...imageResizerOptions)
      .then(({ uri }) => {
        const response = uri && { uri };
        resolve(response);
      })
      .catch((error) => {
        reject(utils.app.createError(error));
      });
  });
}
