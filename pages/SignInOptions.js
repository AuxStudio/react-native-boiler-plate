import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
    Page,
    HeaderBar,
    Button,
    Loader,
    SnackBar,
} from "react-native-simple-components";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";
import Icon from "../assets/icons/index";

export class SignInOptions extends React.Component {
    constructor(props) {
        super(props);

        this.signInUserWithFacebook = this.signInUserWithFacebook.bind(this);
        this.signInUserWithGoogle = this.signInUserWithGoogle.bind(this);
        this.signInUserWithEmail = this.signInUserWithEmail.bind(this);
        this.signInUserAnonymously = this.signInUserAnonymously.bind(this);

        this.state = {
            isFetchingData: false,
        };
    }

    static get propTypes() {
        return {
            authenticated: PropTypes.bool,
            anonymous: PropTypes.bool,
            cloudDataSuccess: PropTypes.bool,
            uid: PropTypes.string,
            userEmail: PropTypes.string,
            userName: PropTypes.string,
            userPhotoUrl: PropTypes.object,
            userSettings: PropTypes.object,
        };
    }

    componentDidUpdate() {
        // Anonymous user (no data)
        if (this.props.authenticated && this.props.anonymous) {
            this.props.dispatch({
                type: "TOGGLE_LOADING",
            });

            Actions.home();
        } else if (
            this.props.authenticated &&
            !this.props.cloudDataSuccess &&
            !this.state.isFetchingData
        ) {
            // If we're authenticated, we have not yet loaded data, load/save data to db
            this.setState({
                isFetchingData: true,
            });

            this.props.dispatch({
                type: "loadUser",
                uid: this.props.uid,

                // Add these for the ride in case we have a new user
                userData: {
                    settings: this.props.userSettings,
                    profile: {
                        userEmail: this.props.userEmail,
                        userName: this.props.userName,
                        userPhotoUrl: this.props.userPhotoUrl,
                        dateJoined: Date.now(),
                    },
                },
            });
        } else if (this.props.authenticated && this.props.cloudDataSuccess) {
            // If we have data, we have everything we need
            this.props.dispatch({
                type: "RESET_ERROR",
            });

            Actions.home();
        }
    }

    signInUserWithFacebook() {
        this.props.dispatch({
            type: "TOGGLE_LOADING",
        });

        this.props.dispatch({
            type: "signInUserWithFacebook",
        });
    }

    signInUserWithGoogle() {
        this.props.dispatch({
            type: "TOGGLE_LOADING",
        });

        this.props.dispatch({
            type: "signInUserWithGoogle",
        });
    }

    signInUserWithEmail() {
        Actions.SignInEmail();
    }

    signInUserAnonymously() {
        this.props.dispatch({
            type: "TOGGLE_LOADING",
        });

        this.props.dispatch({
            type: "signInUserAnonymously",
        });
    }

    render() {
        return (
            <Page>
                <HeaderBar backButton />

                <View>
                    <Button
                        icon={
                            <Icon
                                name="facebook"
                                size={styleConstants.iconFont}
                                color={styleConstants.primary}
                            />
                        }
                        handlePress={this.signInUserWithFacebook}
                        text="Continue with Facebook"
                        backgroundColor={styleConstants.white}
                    />
                    <Button
                        icon={
                            <Icon
                                name="google"
                                size={styleConstants.iconFont}
                                color={styleConstants.primary}
                            />
                        }
                        handlePress={this.signInUserWithGoogle}
                        text="Continue with Google"
                        backgroundColor={styleConstants.white}
                    />
                    <Button
                        iconName="mail"
                        handlePress={this.signInUserWithEmail}
                        text="Continue with Email"
                        backgroundColor="transparent"
                    />
                    <Button
                        iconName="anonymous"
                        handlePress={this.signInUserAnonymously}
                        text="Continue Anonymously"
                        backgroundColor="transparent"
                    />
                </View>

                <SnackBar />

                <Loader />
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.main.userAuth.authenticated,
        anonymous: state.main.userAuth.anonymous,
        cloudDataSuccess:
            state.main.appState.error.type === "CLOUD_DATA" &&
            state.main.appState.error.success,
        uid: state.main.userAuth.uid,
        userEmail: state.main.userData.profile.userEmail,
        userName: state.main.userData.profile.userName,
        userPhotoUrl: state.main.userData.profile.userPhotoUrl,
        userSettings: state.main.userData.settings,
    };
}

export default connect(mapStateToProps)(SignInOptions);
