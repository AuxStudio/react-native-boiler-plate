import firebase from 'react-native-firebase';
import utils from '../../utils';

export default function getData(ref) {
  return new Promise((resolve, reject) => {
    utils.log('start getData', { ref });

    firebase
      .database()
      .ref(ref)
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val();

        utils.log('end getData', { data });

        resolve(data);
      })
      .catch((error) => {
        utils.log('end getData', { error });

        reject(utils.createError(error));
      });
  });
}
