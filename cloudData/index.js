import firebase from "react-native-firebase";

import utilities from "../utilities";

const response = {
    success: null,
    message: null,
};

export default class CloudData {
    static listenForData(action) {
        if (__DEV__) {
            console.log("Listening at " + action.node);
        }

        firebase
            .database()
            .ref(action.node)
            .on(
                "value",
                snapshot => {
                    this.props.dispatch({
                        type: action.nextActionType,
                        data: snapshot.val(),
                    });
                },
                error => {
                    // Do nothing - silent error
                }
            );
    }

    static getData(action) {
        if (__DEV__) {
            console.log("Dispatching get at " + action.node);
        }

        return new Promise(resolve => {
            firebase
                .database()
                .ref(action.node)
                .once("value")
                .then(snapshot => {
                    response.success = true;
                    response.message = snapshot.val();
                    resolve(response);
                })
                .catch(error => {
                    response.success = false;
                    response.message = error.message;
                    resolve(response);
                });
        });
    }

    static updateData(action) {
        if (__DEV__) {
            console.log("Dispatching update at " + action.node);
        }

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
        if (__DEV__) {
            console.log("Dispatching set at " + action.node);
        }

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
        if (__DEV__) {
            console.log("Dispatching push at " + action.node);
        }

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
        if (__DEV__) {
            console.log("Dispatching delete at " + action.node);
        }

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
