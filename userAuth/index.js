import firebase from "../firebase";
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
            const user = firebase.auth().currentUser;

            if (user) {
                response.authenticated = true;
                response.message = {
                    uid: user._user.uid,
                    anonymous: user._user.isAnonymous,
                };
                resolve(response);
            } else {
                response.authenticated = false;
                resolve(response);
            }
        });
    }

    static signUpUserWithEmail(action) {
        return new Promise(resolve => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    action.userEmail,
                    action.userPassword
                )
                .then(user => {
                    response.authenticated = true;
                    response.message = {
                        uid: user._user.uid,
                        userEmail: user._user.email,
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

    static signInUserWithEmail(action) {
        return new Promise(resolve => {
            firebase
                .auth()
                .signInWithEmailAndPassword(
                    action.userEmail,
                    action.userPassword
                )
                .then(user => {
                    response.authenticated = true;
                    response.message = {
                        uid: user._user.uid,
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

    static signInUserWithFacebook(action) {
        return new Promise(resolve => {
            LoginManager.logInWithReadPermissions(["public_profile"]).then(
                result => {
                    if (result.isCancelled) {
                        response.authenticated = false;
                        response.message = "Facebook login cancelled";
                        resolve(response);
                    } else {
                        AccessToken.getCurrentAccessToken()
                            .then(user => {
                                const credential = {
                                    provider: "facebook",
                                    token: user.accessToken,
                                    secret: "",
                                };

                                firebase
                                    .auth()
                                    .signInWithCredential(credential)
                                    .then(currentUser => {
                                        response.authenticated = true;
                                        response.message = {
                                            uid: currentUser._user.uid,
                                            userEmail: currentUser._user.email,
                                            userName:
                                                currentUser._user.displayName,
                                            userPhotoURL:
                                                currentUser._user.photoURL,
                                        };
                                        resolve(response);
                                    })
                                    .catch(error => {
                                        response.authenticated = false;
                                        response.message = error;
                                        resolve(response);
                                    });
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
                    response.message = error; // TODO: check this
                    resolve(response);
                }
            );
        });
    }

    static signInUserWithGoogle(action) {
        return new Promise(resolve => {
            GoogleSignin.hasPlayServices({ autoResolve: true })
                .then(() => {
                    GoogleSignin.configure({
                        ...config.googleSignIn,
                    })
                        .then(() => {
                            GoogleSignin.signIn()
                                .then(user => {
                                    const credential = {
                                        provider: "google",
                                        token: user.idToken,
                                        secret: user.accessToken,
                                    };

                                    firebase
                                        .auth()
                                        .signInWithCredential(credential)
                                        .then(currentUser => {
                                            response.authenticated = true;
                                            response.message = {
                                                uid: currentUser._user.uid,
                                                userEmail:
                                                    currentUser._user.email,
                                                userName:
                                                    currentUser._user
                                                        .displayName,
                                                userPhotoURL:
                                                    currentUser._user.photoURL,
                                            };
                                            resolve(response);
                                        })
                                        .catch(error => {
                                            response.authenticated = false;
                                            response.message = error;
                                            resolve(response);
                                        });
                                })
                                .catch(error => {
                                    response.authenticated = false;
                                    response.message = error; // TODO: check this
                                    resolve(response);
                                })
                                .done();
                        })
                        .catch(error => {
                            response.authenticated = false;
                            response.message = error; // TODO: check this
                            resolve(response);
                        });
                })
                .catch(error => {
                    response.authenticated = false;
                    response.message = error; // TODO: check this
                    resolve(response);
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
