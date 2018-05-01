import ImageResizer from 'react-native-image-resizer';
import config from '../../config';
import utils from '../../utils';

export default function resizeImage(imageURI) {
  return new Promise((resolve, reject) => {
    utils.log('start resizeImage', { imageURI });

    const imageResizerOptions = [
      imageURI, // uri to image
      ...config.images.imageResizerOptions, // maxWidth, maxHeight, format, quality, rotation
    ];

    ImageResizer.createResizedImage(...imageResizerOptions)
      .then(({ uri }) => {
        utils.log('end resizeImage', { uri });

        resolve(uri);
      })
      .catch((error) => {
        utils.log('end resizeImage', { error });

        reject(utils.createError(error));
      });
  });
}
