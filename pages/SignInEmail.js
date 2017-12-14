import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
    Page,
    HeaderBar,
    InputContainer,
    InfoBlock,
    Input,
    Button,
    Loader,
    SnackBar,
} from "react-native-simple-components";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";
import Icon from "../assets/icons/index";

export class SignInEmail extends React.Component {
    constructor(props) {
        super(props);

        this.updateUserEmail = this.updateUserEmail.bind(this);
        this.updateUserPassword = this.updateUserPassword.bind(this);
        this.signIn = this.signIn.bind(this);

        this.state = {
            isFetchingData: false,
        };
    }

    static get propTypes() {
        return {
            authenticated: PropTypes.bool,
            cloudDataSuccess: PropTypes.bool,
            uid: PropTypes.string,
            userEmail: PropTypes.string,
            userPassword: PropTypes.string,
            userSettings: PropTypes.object,
        };
    }

    componentDidUpdate() {
        // If we're authenticated and we have not yet loaded data, load/save data to db
        if (
            this.props.authenticated &&
            !this.props.cloudDataSuccess &&
            !this.state.isFetchingData
        ) {
            this.setState({
                isFetchingData: true,
            });

            this.props.dispatch({
                type: "getData",
                uid: this.props.uid,

                // Add these for the ride in case we have a new user
                userData: {
                    settings: this.props.userSettings,
                    profile: {
                        userEmail: this.props.userEmail,
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

    updateUserEmail(text) {
        this.props.dispatch({
            type: "UPDATE_USER_EMAIL",
            value: text,
        });
    }

    updateUserPassword(text) {
        this.props.dispatch({
            type: "UPDATE_USER_PASSWORD",
            value: text,
        });
    }

    signIn() {
        if (
            this.props.userEmail &&
            (this.props.userPassword && this.props.userPassword.length >= 6)
        ) {
            this.props.dispatch({
                type: "TOGGLE_LOADING",
            });

            this.props.dispatch({
                type: "signInUserWithEmail",
                userEmail: this.props.userEmail,
                userPassword: this.props.userPassword,
            });
        } else if (
            this.props.userPassword &&
            this.props.userPassword.length < 6
        ) {
            this.props.dispatch({
                type: "SET_ERROR",
                errorType: "USER",
                success: config.auth.passwordLength.type,
                message: config.auth.passwordLength.message,
            });
        }
    }

    render() {
        const enableContinueButton =
            this.props.userEmail &&
            this.props.userEmail.indexOf("@") > 0 &&
            this.props.userPassword;

        return (
            <Page>
                <HeaderBar
                    text="Forgot Password?"
                    handleTextPress={() => Actions.forgotPassword()}
                    textRight
                    backButton
                />

                <InputContainer>
                    <InfoBlock
                        title="Sign In"
                        titleColor={styleConstants.white}
                    />

                    <Input
                        placeholder="EMAIL ADDRESS"
                        value={this.props.userEmail}
                        handleChange={this.updateUserEmail}
                        handleFocus={this.resetError}
                        keyboardType="email-address"
                    />
                    <Input
                        placeholder="PASSWORD"
                        value={this.props.userPassword}
                        handleChange={this.updateUserPassword}
                        handleFocus={this.resetError}
                        type="password"
                    />
                </InputContainer>

                <Button
                    iconName="check"
                    handlePress={this.signIn}
                    text="Continue"
                    backgroundColor={styleConstants.white}
                    disabled={!enableContinueButton}
                />

                <SnackBar />

                <Loader />
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.main.userAuth.authenticated,
        cloudDataSuccess:
            state.main.appState.error.type === "CLOUD_DATA" &&
            state.main.appState.error.success,
        uid: state.main.userAuth.uid,
        userEmail: state.main.userData.profile.userEmail,
        userPassword: state.main.userAuth.userPassword,
        userSettings: state.main.userData.settings,
    };
}

export default connect(mapStateToProps)(SignInEmail);
