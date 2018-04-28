import ImagePicker from 'react-native-image-picker';

export default function showImagePicker() {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      console.log('Show image picker');
    }

    ImagePicker.showImagePicker(null, ({ uri, error }) => {
      if (error) {
        reject(new Error(error));
      } else {
        resolve(uri);
      }
    });
  });
}
