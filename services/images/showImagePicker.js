import ImagePicker from 'react-native-image-picker';

export default function showImagePicker() {
  return new Promise((resolve, reject) => {
    ImagePicker.showImagePicker(null, ({ uri, error }) => {
      if (error) {
        reject(new Error(error));
      } else {
        resolve({
          payload: uri,
        });
      }
    });
  });
}
