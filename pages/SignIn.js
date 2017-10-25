import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
    Page,
    HeaderBar,
    InfoBlock,
    Button,
    Loader,
    SnackBar,
} from "react-native-simple-components";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";
import Icon from "../assets/icons/index";

export class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.signInUserWithFacebook = this.signInUserWithFacebook.bind(this);

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
            userName: PropTypes.string,
            userPhotoUrl: PropTypes.object,
            userSettings: PropTypes.object,
        };
    }

    componentDidUpdate() {
        // If we're authenticated, we have not yet loaded data, load/save data to db
        if (
            this.props.authenticated &&
            !this.props.cloudDataSuccess &&
            !this.state.isFetchingData
        ) {
            this.setState({
                isFetchingData: true,
            });

            this.props.dispatch({
                type: "loadUserData",
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
                    categories: this.props.categories,
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

    render() {
        return (
            <Page fauxFooter>
                <HeaderBar
                    text="Log In"
                    handleTextPress={() => Actions.signInWithEmail()}
                    textRight
                />

                <InfoBlock
                    title="Title"
                    subtitle="Subtitle"
                    titleColor={styleConstants.white}
                    subtitleColor={styleConstants.white}
                />

                <View>
                    <Button
                        customIcon={
                            <Icon
                                name="facebook"
                                size={styleConstants.iconFont}
                                color={styleConstants.white}
                            />
                        }
                        handlePress={this.signInUserWithFacebook}
                        text="Continue with Facebook"
                        backgroundColor={styleConstants.white}
                    />
                    <Button
                        handlePress={() => Actions.signInOptions()}
                        text="More Options"
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

export default connect(mapStateToProps)(SignIn);
