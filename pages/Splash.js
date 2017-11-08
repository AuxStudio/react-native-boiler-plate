import React from "react";
import PropTypes from "prop-types";
import { StatusBar, View, Platform } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Page, SnackBar, Loader } from "react-native-simple-components";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";
import Icon from "../assets/icons/index";

export class Splash extends React.Component {
    constructor(props) {
        super(props);

        this.startTimer = this.startTimer.bind(this);
        this.runLogic = this.runLogic.bind(this);
        this.resetError = this.resetError.bind(this);
        this.retrySnackBarAction = this.retrySnackBarAction.bind(this);

        this.state = {
            isAuthenticating: false,
            isFetchingData: false,
            time: 0,
        };
    }

    static get propTypes() {
        return {
            loading: PropTypes.bool,
            uid: PropTypes.string,
            authenticated: PropTypes.bool,
            error: PropTypes.object,
            retryAction: PropTypes.object,
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
        // Redirect to home if we're authenticated and the splash screen has shown for at the minimumDisplayDuration
        if (
            config.splash.disableUserAuth ||
            (this.props.authenticated &&
                this.props.cloudDataSuccess &&
                (this.state.time >= config.splash.minimumDisplayDuration ||
                    config.splash.disableSplashPageLoadingDelay))
        ) {
            !config.testing.disableSplashPageLoadingDelay &&
                clearInterval(this.timer);

            this.props.dispatch({
                type: "TOGGLE_LOADING",
            });

            this.resetError();

            Actions.home();
        } else if (
            this.props.authenticated &&
            !this.props.cloudDataSuccess &&
            !this.state.isFetchingData
        ) {
            this.setState({
                isFetchingData: true,
            });

            // Get the user's settings
            this.props.dispatch({
                type: "getData",
                node: "users",
                subNode: "settings",
                uid: this.props.uid,
            });
        } else if (!this.props.authenticated && !this.state.isAuthenticating) {
            // Set this prop so we don't reauthenticate while the timer is running
            this.setState({
                isAuthenticating: true,
            });

            setTimeout(() => {
                this.props.dispatch({
                    type: "getUserAuth",
                });
            }, 0); // getUserAuth is not initialised immediately
        }
    }

    resetError() {
        this.props.dispatch({
            type: "RESET_ERROR",
        });
    }

    retrySnackBarAction() {
        this.resetError();

        this.props.dispatch({
            ...this.props.retryAction,
        });
    }

    render() {
        const snackBar = this.props.error.message && (
            <SnackBar
                iconName="error"
                iconColor="black"
                text={this.props.error.message}
                handleClose={this.resetError}
                handleRetry={this.retrySnackBarAction}
            />
        );

        return (
            <Page>
                <StatusBar backgroundColor={styleConstants.darkTransPrimary} />

                <Loader loading={this.props.loading} />
                {snackBar}
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.main.appState.loading,
        uid: state.main.userAuth.uid,
        authenticated: state.main.userAuth.authenticated,
        error: state.main.appState.error,
        retryAction: state.main.appState.retryAction,
        cloudDataSuccess:
            state.main.appState.error.type === "CLOUD_DATA" &&
            state.main.appState.error.success,
    };
}

export default connect(mapStateToProps)(Splash);
