import firebase from "react-native-firebase";

import utilities from "../utilities";

const response = {
    success: null,
    message: null,
};

export default class CloudData {
    static getData(action) {
        console.log("Dispatching get at " + action.node);

        return new Promise(resolve => {
            firebase
                .database()
                .ref(action.node)
                .on(
                    "value",
                    snapshot => {
                        response.success = true;
                        response.message = snapshot.val();
                        resolve(response);
                    },
                    error => {
                        response.success = false;
                        response.message = error.message;
                        resolve(response);
                    }
                );
        });
    }

    static updateData(action) {
        console.log("Dispatching update at " + action.node);

        return new Promise(resolve => {
            firebase
                .database()
                .ref(action.node)
                .update({ ...action.data })
                .then(() => {
                    response.success = true;
                    response.message = action.data;
                    resolve(response);
                })
                .catch(error => {
                    response.success = false;
                    response.message = error.message;
                    resolve(response);
                });
        });
    }

    static setData(action) {
        console.log("Dispatching set at " + action.node);

        return new Promise(resolve => {
            firebase
                .database()
                .ref(action.node)
                .set(action.data)
                .then(() => {
                    response.success = true;
                    response.message = action.data;
                    resolve(response);
                })
                .catch(error => {
                    response.success = false;
                    response.message = error.message;
                    resolve(response);
                });
        });
    }

    static pushData(action) {
        console.log("Dispatching push at " + action.node);

        return new Promise(resolve => {
            firebase
                .database()
                .ref(action.node)
                .push(action.data)
                .then(() => {
                    response.success = true;
                    response.message = action.data;
                    resolve(response);
                })
                .catch(error => {
                    response.success = false;
                    response.message = error.message;
                    resolve(response);
                });
        });
    }

    static deleteData(action) {
        console.log("Dispatching delete at " + action.node);

        return new Promise(resolve => {
            firebase
                .database()
                .ref(action.node)
                .set(null)
                .then(() => {
                    response.success = true;
                    response.message = null;
                    resolve(response);
                })
                .catch(error => {
                    response.success = false;
                    response.message = error.message;
                    resolve(response);
                });
        });
    }
}
