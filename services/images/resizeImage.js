import ImageResizer from 'react-native-image-resizer';
import config from '../../config';

export default function resizeImage(action) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Resizing image: ${action.payload}`);
    }

    const portrait = action.payload.height > action.payload.width;

    const imageResizerOptions = [
      action.payload.uri, // uri to image
      portrait ? action.payload.maxWidth : action.payload.maxWidth * 2, // maxWidth
      portrait ? action.payload.maxWidth * 2 : action.payload.maxWidth, // maxHeight
      ...config.images.imageResizerOptions, // format, quality, rotation
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
