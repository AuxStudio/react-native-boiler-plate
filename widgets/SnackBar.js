import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styleConstants from "../assets/styleConstants";

import { Snackbar } from "react-native-simple-components";

export class SnackBarComponent extends React.Component {
    constructor(props) {
        super(props);

        this.resetError = this.resetError.bind(this);
        this.handleAction = this.handleAction.bind(this);
    }

    static get propTypes() {
        return {
            error: PropTypes.object,
        };
    }

    resetError() {
        this.props.dispatch({
            type: "RESET_ERROR",
        });
    }

    handleAction() {
        this.resetError();

        const actionData = this.props.action.data && this.props.action.data;

        this.props.dispatch({
            type: this.props.action.type,
            ...actionData,
        });
    }

    render() {
        const snackBar = this.props.error.type ? (
            <SnackBar
                text={this.props.error.message}
                actionText={this.props.errorAction.text}
                handleClose={this.resetError}
                handleAction={this.props.errorAction.type && this.handleAction}
                shouldAutoHide
                textStyle={styles.snackBarText}
                actionTextStyle={styles.actionText}
                containerStyle={styles.container}
            />
        ) : null;

        return snackBar;
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#323232",
    },
    snackBarText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
    },
    actionText: {
        fontSize: styleConstants.regularFont,
        color: "yellow",
        fontWeight: "500",
    },
});

function mapStateToProps(state) {
    return {
        error: state.main.appState.error,
    };
}

export default connect(mapStateToProps)(SnackBarComponent);
