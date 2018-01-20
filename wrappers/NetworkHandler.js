import React from "react";
import { NetInfo } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Analytics from "../analytics";

import HighLatencyNetworkDetector from "./HighLatencyNetworkDetector";

export class NetworkHandler extends React.Component {
    static get propTypes() {
        return {
            appStart: PropTypes.bool,
        };
    }

    componentDidMount() {
        NetInfo.addEventListener(
            "connectionChange",
            this.handleConnectionChange,
        );

        // If we don't delay this, the event fires immediately after app mount and displays the success snackbar
        setTimeout(() => {
            this.props.dispatch({
                type: "SET_APP_START",
            });
        }, 1000);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener(
            "connectionChange",
            this.handleConnectionChange,
        );
    }

    handleConnectionChange = connectionInfo => {
        if (connectionInfo.type === "none") {
            Analytics.logEvent("network_offline");

            this.props.dispatch({
                type: "SET_ERROR",
                errorType: "NETWORK",
                message: "Oh no! It looks like you're offline.",
                iconName: "error-outline",
            });
        } else if (this.props.appStart) {
            // Only dispatch this action if we were previously offline
            this.props.dispatch({
                type: "SET_ERROR",
                errorType: "NETWORK",
                message: "Good to go! You are back online.",
                success: true,
                iconName: "check",
            });
        }
    };

    render() {
        return (
            <HighLatencyNetworkDetector>
                {this.props.children}
            </HighLatencyNetworkDetector>
        );
    }
}

function mapStateToProps(state) {
    return {
        appStart: state.main.appState.appStart,
    };
}

export default connect(mapStateToProps)(NetworkHandler);
