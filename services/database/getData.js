import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function getData(ref) {
  return new Promise((resolve, reject) => {
    utils.app.log('start getData', { ref });

    firebase
      .database()
      .ref(ref)
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        const response = data && { data };

        utils.app.log('end getData', response);

        resolve(response);
      })
      .catch((error) => {
        utils.app.log('end getData', { error });

        reject(utils.app.createError(error));
      });
  });
}
