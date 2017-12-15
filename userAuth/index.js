import firebase from "react-native-firebase";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";

import config from "../config";

const response = {
    authenticated: null,
    message: null,
    success: null,
};

export default class UserAuth {
    static getUserAuth() {
        return new Promise(resolve => {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    response.authenticated = true;
                    response.message = {
                        uid: user._user.uid,
                        userEmail: user._user.email
                            ? user._user.email
                            : user._user.providerData.length &&
                              user._user.providerData[0].email,
                        userName:
                            user._user.providerData.length &&
                            user._user.providerData[0].displayName,
                        userPhotoURL:
                            user._user.providerData.length &&
                            user._user.providerData[0].photoURL,
                        anonymous: user._user.isAnonymous,
                    };
                    resolve(response);
                } else {
                    response.authenticated = false;
                    resolve(response);
                }
            });
        });
    }

    static signInUserAnonymously() {
        return new Promise(resolve => {
            firebase
                .auth()
                .signInAnonymously()
                .then(user => {
                    response.authenticated = true;
                    response.message = {
                        uid: user._user.uid,
                    };
                    resolve(response);
                })
                .catch(error => {
                    response.authenticated = false;
                    response.message = error;
                    resolve(response);
                });
        });
    }

    static getUserCredentialFromEmail(action) {
        return new Promise(resolve => {
            const credential = firebase.auth.EmailAuthProvider.credential(
                action.email,
                action.password
            );

            response.success = true;
            response.message = {
                credential,
                userName: action.userName,
                userEmail: action.email,
            };
            resolve(response);
        });
    }

    static sendPasswordResetEmail(action) {
        return new Promise(resolve => {
            firebase
                .auth()
                .sendPasswordResetEmail(action.userEmail)
                .then(() => {
                    response.success = true;
                    response.message = null;
                    resolve(response);
                })
                .catch(error => {
                    response.success = false;
                    response.message = error;
                    resolve(response);
                });
        });
    }

    static getUserCredentialFromFacebook(action) {
        return new Promise(resolve => {
            LoginManager.logOut();
            LoginManager.logInWithReadPermissions(["public_profile"]).then(
                result => {
                    if (result.isCancelled) {
                        response.authenticated = false;
                        response.message = "Facebook login cancelled";
                        resolve(response);
                    } else {
                        AccessToken.getCurrentAccessToken()
                            .then(user => {
                                const credential = firebase.auth.FacebookAuthProvider.credential(
                                    user.accessToken
                                );

                                response.success = true;
                                response.message = {
                                    credential,
                                };
                                resolve(response);
                            })
                            .catch(error => {
                                response.authenticated = false;
                                response.message = "Unable to get access token";
                                resolve(response);
                            });
                    }
                },
                error => {
                    response.authenticated = false;
                    response.message = error;
                    resolve(response);
                }
            );
        });
    }

    static getUserCredentialFromGoogle(action) {
        return new Promise(resolve => {
            GoogleSignin.hasPlayServices({ autoResolve: true })
                .then(() => {
                    GoogleSignin.configure({
                        ...config.googleSignIn,
                    })
                        .then(() => {
                            GoogleSignin.signIn()
                                .then(user => {
                                    const credential = firebase.auth.GoogleAuthProvider.credential(
                                        user.idToken,
                                        user.accessToken
                                    );

                                    response.success = true;
                                    response.message = {
                                        credential,
                                    };
                                    resolve(response);
                                })
                                .catch(error => {
                                    response.authenticated = false;
                                    response.message = error;
                                    resolve(response);
                                })
                                .done();
                        })
                        .catch(error => {
                            response.authenticated = false;
                            response.message = error;
                            resolve(response);
                        });
                })
                .catch(error => {
                    response.authenticated = false;
                    response.message = error;
                    resolve(response);
                });
        });
    }

    static linkUserWithCredential(action) {
        return new Promise(resolve => {
            firebase
                .auth()
                .currentUser.linkWithCredential(action.credential)
                .then(user => {
                    response.authenticated = true;
                    response.message = {
                        uid: user._user.uid,
                        userEmail: user._user.email
                            ? user._user.email
                            : user._user.providerData.length &&
                              user._user.providerData[0].email,
                        userName:
                            user._user.providerData.length &&
                            user._user.providerData[0].displayName,
                        userPhotoURL:
                            user._user.providerData.length &&
                            user._user.providerData[0].photoURL,
                    };
                    resolve(response);
                })
                .catch(error => {
                    response.authenticated = false;
                    response.message = error.code;
                    resolve(response);
                });
        });
    }

    static signInUserWithCredential(action) {
        return new Promise(resolve => {
            firebase
                .auth()
                .signInWithCredential(action.credential)
                .then(user => {
                    response.authenticated = true;
                    response.message = {
                        uid: user._user.uid,
                        userEmail: user._user.email
                            ? user._user.email
                            : user._user.providerData.length &&
                              user._user.providerData[0].email,
                        userName:
                            user._user.providerData.length &&
                            user._user.providerData[0].displayName,
                        userPhotoURL:
                            user._user.providerData.length &&
                            user._user.providerData[0].photoURL,
                    };
                    resolve(response);
                })
                .catch(error => {
                    response.authenticated = false;
                    response.message = error;
                    resolve(response);
                });
        }).catch(error => {
            response.authenticated = false;
            response.message = error;
            resolve(response);
        });
    }

    static signOutUser() {
        return new Promise(resolve => {
            firebase
                .auth()
                .signOut()
                .then(user => {
                    response.success = true;
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
