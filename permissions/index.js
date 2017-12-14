import RNPermissions from "react-native-permissions";

const Permissions = {};

// Checks a permission. If authorized, fires successCallback, otherwise requests permission. If that is authorized, fires successCallback, otherwise fires errorCallback
Permissions.handlePermission = (permission, successCallback, errorCallback) => {
    RNPermissions.check(permission).then(response => {
        if (response === "authorized") {
            successCallback && successCallback();
        } else {
            RNPermissions.request(permission).then(response => {
                if (response === "authorized") {
                    successCallback && successCallback();
                } else {
                    errorCallback && errorCallback();
                }
            });
        }
    });
};

export default Permissions;
