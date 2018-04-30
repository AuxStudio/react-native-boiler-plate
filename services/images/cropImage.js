import { ImageEditor } from 'react-native';

export default function cropImage(action) {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log(`Cropping image: ${JSON.stringify(action.payload)}`);
    }

    const offsetX = action.payload.portrait
      ? 0
      : action.payload.maxWidth / 2 * action.payload.width / action.payload.height -
        action.payload.maxWidth / 2;
    const offsetY = action.payload.portrait
      ? action.payload.maxWidth / 2 * action.payload.height / action.payload.width -
        action.payload.maxWidth / 2
      : 0;

    const cropOptions = {
      offset: {
        x: offsetX,
        y: offsetY,
      },
      size: {
        width: action.payload.maxWidth,
        height: action.payload.maxWidth,
      },
    };

    ImageEditor.cropImage(
      action.payload.uri,
      cropOptions,
      (uri) => {
        resolve(uri);
      },
      (error) => {
        reject(new Error(error));
      },
    );
  });
}
