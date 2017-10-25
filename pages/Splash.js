import React from "react";
import PropTypes from "prop-types";
import { StatusBar, View, Platform } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Page, Logo, SnackBar } from "react-native-simple-components";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";
import Icon from "../assets/icons/index";

export class Splash extends React.Component {
    constructor(props) {
        super(props);

        this.startTimer = this.startTimer.bind(this);
        this.runLogic = this.runLogic.bind(this);

        this.state = {
            isFethingData: false,
            time: 0,
        };
    }

    static get propTypes() {
        return {
            authenticated: PropTypes.bool,
            isAuthenticating: PropTypes.bool,
            anonymous: PropTypes.bool,
            redirectToSignInPage: PropTypes.bool,
            uid: PropTypes.string,
            cloudDataSuccess: PropTypes.bool,
        };
    }

    componentDidMount() {
        if (!config.testing.disabledLoadingDelay) {
            this.startTimer();
        }
        this.runLogic();
    }

    componentDidUpdate() {
        this.runLogic();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = setInterval(() => {
            this.setState({
                time: (this.state.time += 1),
            });
        }, 1000);
    }

    runLogic() {
        // Redirect user to sign in page if we're not authenticated and have received the redirect flag from getUserAuth
        if (
            this.props.redirectToSignInPage &&
            (this.state.time >= 2 || config.testing.disableLoadingDelay)
        ) {
            !config.testing.disableLoadingDelay && clearInterval(this.timer);
            Actions.welcome();
        } else if (
            this.props.authenticated &&
            this.props.anonymous &&
            (this.state.time >= 2 || config.testing.disableLoadingDelay)
        ) {
            // Anonymous user (no data)
            !config.testing.disableLoadingDelay && clearInterval(this.timer);
            this.props.dispatch({
                type: "TOGGLE_LOADING",
            });

            Actions.home();
        } else if (
            this.props.authenticated &&
            !this.props.cloudDataSuccess &&
            !this.state.isFetchingData
        ) {
            // If we're authenticated and we have not yet loaded data, load/save data to db
            this.setState({
                isFetchingData: true,
            });

            this.props.dispatch({
                type: "loadUserData",
                uid: this.props.uid,
            });
        } else if (this.props.authenticated && this.props.cloudDataSuccess) {
            this.props.dispatch({
                type: "RESET_ERROR",
            });

            Actions.home();
        } else if (!this.props.authenticated && !this.state.isAuthenticating) {
            // Set this prop so we don't reauthenticate while the timer is running
            this.setState({
                isAuthenticating: true,
            });

            // getUserAuth is not initialised immediately
            setTimeout(() => {
                this.props.dispatch({
                    type: "getUserAuth",
                });
            }, 0);
        }
    }

    render() {
        return (
            <Page>
                <StatusBar backgroundColor={styleConstants.darkTransPrimary} />

                <Logo />

                <SnackBar />
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.main.userAuth.authenticated,
        anonymous: state.main.userAuth.anonymous,
        redirectToSignInPage: state.main.userAuth.redirectToSignInPage,
        uid: state.main.userAuth.uid,
        cloudDataSuccess:
            state.main.appState.error.type === "CLOUD_DATA" &&
            state.main.appState.error.success,
    };
}

export default connect(mapStateToProps)(Splash);
