import firebase from "../firebase";

const response = {
    success: null,
    message: null,
};

export default class CloudData {
    static loadUserData(action) {
        return new Promise(resolve => {
            firebase
                .database()
                .ref("users/" + action.uid)
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

    static saveUserData(action) {
        // Allows us to pass in eg. 'profile' and only set that node
        const nodeRef = action.node || "";

        console.log("Dispatching save at users/" + action.uid + "/" + nodeRef);
        console.log(action.userData);

        return new Promise(resolve => {
            firebase
                .database()
                .ref("users/" + action.uid + "/" + nodeRef)
                .set({
                    ...action.userData,
                })
                .then(() => {
                    response.success = true;
                    response.message = action.userData;
                    resolve(response);
                })
                .catch(error => {
                    response.success = false;
                    response.message = error.message;
                    resolve(response);
                });
        });
    }

    static deleteUserData(action) {
        // Allows us to pass in eg.'profile' and only set that node
        const nodeRef = action.node || "";

        console.log(
            "Dispatching delete at users/" + action.uid + "/" + nodeRef
        );

        return new Promise(resolve => {
            firebase
                .database()
                .ref("users/" + action.uid + "/" + nodeRef)
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
