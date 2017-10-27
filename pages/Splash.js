import React from "react";
import PropTypes from "prop-types";
import { StatusBar, View, Platform } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { SnackBar, Loader } from "react-native-simple-components";

import Page from "../components/Page";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";
import Icon from "../assets/icons/index";

export class Splash extends React.Component {
    constructor(props) {
        super(props);

        this.startTimer = this.startTimer.bind(this);
        this.runLogic = this.runLogic.bind(this);
        this.resetSnackBar = this.resetSnackBar.bind(this);
        this.retrySnackBarAction = this.retrySnackBarAction.bind(this);

        this.state = {
            isAuthenticating: false,
            time: 0,
        };
    }

    static get propTypes() {
        return {
            authenticated: PropTypes.bool,
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
            this.props.authenticated &&
            (this.state.time >= config.splash.minimumDisplayDuration ||
                config.splash.disableLoadingDelay)
        ) {
            !config.testing.disableLoadingDelay && clearInterval(this.timer);
            this.props.dispatch({
                type: "TOGGLE_LOADING",
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

    resetSnackBar() {
        this.props.dispatch({
            type: "RESET_ERROR",
        });
    }

    retrySnackBarAction() {
        this.resetSnackBar();

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
                handleClose={this.resetSnackBar}
                handleRetry={this.retrySnackBarAction}
            />
        );

        return (
            <Page>
                <StatusBar backgroundColor={styleConstants.darkTransPrimary} />

                <Loader />
                {snackBar}
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.main.userAuth.authenticated,
        error: state.main.appState.error,
        retryAction: state.main.appState.retryAction,
    };
}

export default connect(mapStateToProps)(Splash);
