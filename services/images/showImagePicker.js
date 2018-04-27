import ImagePicker from 'react-native-image-picker';

export default function showImagePicker() {
  return new Promise((resolve) => {
    ImagePicker.showImagePicker(null, ({ uri, error }) => {
      if (error) {
        resolve({
          payload: new Error(error),
          error: true,
        });
      } else {
        resolve({
          payload: uri,
        });
      }
    });
  });
}
