import { ImageEditor } from 'react-native';

export default function cropImage(action) {
  return new Promise((resolve) => {
    const offsetX = action.meta.portrait
      ? 0
      : action.meta.maxWidth / 2 * action.meta.width / action.meta.height -
        action.meta.maxWidth / 2;
    const offsetY = action.meta.portrait
      ? action.meta.maxWidth / 2 * action.meta.height / action.meta.width - action.meta.maxWidth / 2
      : 0;

    const cropOptions = {
      offset: {
        x: offsetX,
        y: offsetY,
      },
      size: {
        width: action.meta.maxWidth,
        height: action.meta.maxWidth,
      },
    };

    ImageEditor.cropImage(
      action.meta.uri,
      cropOptions,
      (uri) => {
        resolve({
          payload: uri,
        });
      },
      (error) => {
        resolve({
          payload: new Error(error),
          error: true,
        });
      },
    );
  });
}
