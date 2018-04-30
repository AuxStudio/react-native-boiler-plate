import ImageResizer from 'react-native-image-resizer';
import config from '../../config';

export default function resizeImage(action) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Resizing image: ${JSON.stringify(action.payload)}`);
    }

    const imageResizerOptions = [
      action.payload.uri, // uri to image
      ...config.images.imageResizerOptions, // maxWidth, maxHeight, format, quality, rotation
    ];

    ImageResizer.createResizedImage(...imageResizerOptions)
      .then(({ uri }) => {
        resolve(uri);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
