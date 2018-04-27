import ImageResizer from 'react-native-image-resizer';
import config from '../../config';

export default function resizeImage(action) {
  return new Promise((resolve) => {
    const portrait = action.meta.height > action.meta.width;

    const imageResizerOptions = [
      action.meta.uri, // uri to image
      portrait ? action.meta.maxWidth : action.meta.maxWidth * 2, // maxWidth
      portrait ? action.meta.maxWidth * 2 : action.meta.maxWidth, // maxHeight
      ...config.images.imageResizerOptions, // format, quality, rotation
    ];

    ImageResizer.createResizedImage(...imageResizerOptions)
      .then((resizedImageUri) => {
        resolve({
          payload: {
            uri: resizedImageUri,
            portrait,
            width: action.meta.width,
            height: action.meta.height,
          },
        });
      })
      .catch((error) => {
        resolve({
          payload: new Error(error),
          error: true,
        });
      });
  });
}
