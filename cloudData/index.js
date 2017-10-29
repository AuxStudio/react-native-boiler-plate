import firebase from "../firebase";

const response = {
    success: null,
    message: null,
};

export default class CloudData {
    static getData(action) {
        const nodeRef = action.node + "/" + action.uid + "/" + action.subNode;

        console.log("Dispatching get at " + nodeRef);

        return new Promise(resolve => {
            firebase
                .database()
                .ref(nodeRef)
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
        const nodeRef = action.node + "/" + action.uid + "/" + action.subNode;

        console.log("Dispatching update at " + nodeRef);

        return new Promise(resolve => {
            firebase
                .database()
                .ref(nodeRef)
                .update({
                    ...action.data,
                })
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
        const nodeRef = action.node + "/" + action.uid + "/" + action.subNode;

        console.log("Dispatching push at " + nodeRef);

        return new Promise(resolve => {
            firebase
                .database()
                .ref(nodeRef)
                .push({
                    ...action.data,
                })
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
        const nodeRef = action.node + "/" + action.uid + "/" + action.subNode;

        console.log("Dispatching delete at " + nodeRef);

        return new Promise(resolve => {
            firebase
                .database()
                .ref(nodeRef)
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
