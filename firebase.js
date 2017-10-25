import RNFirebase from "react-native-firebase";

import config from "./config";

const firebase = new RNFirebase.initializeApp({
    ...config.firebase,
});

export default firebase;
