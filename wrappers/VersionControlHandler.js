import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import config from "../config";
import CloudData from "../cloudData";

export class VersionControlHandler extends React.Component {
    static get propTypes() {
        return {
            authenticated: PropTypes.bool,
            appVersion: PropTypes.object,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.authenticated && !prevProps.authenticated) {
            CloudData.listenForData("version", data => {
                this.props.dispatch({
                    type: "SET_APP_VERSION",
                    node: "version",
                    data,
                });
            });
        }

        if (
            this.props.appVersion &&
            this.props.appVersion.major !== config.version.app.major
        ) {
            Actions.forceUpdate();
        }
    }

    render() {
        return this.props.children;
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.main.userAuth.authenticated,
        appVersion: state.main.appData.appVersion,
    };
}

export default connect(mapStateToProps)(VersionControlHandler);
