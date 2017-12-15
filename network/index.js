import { NetInfo } from "react-native";

const response = {
    success: null,
    message: null,
};

export default class Network {
    static getConnectionInfo(action) {
        return new Promise(resolve => {
            NetInfo.getConnectionInfo()
                .then(connectionInfo => {
                    response.success = true;
                    response.message = connectionInfo;
                    resolve(response);
                })
                .catch(error => {
                    response.success = false;
                    response.message = error;
                    resolve(response);
                });
        });
    }
}
