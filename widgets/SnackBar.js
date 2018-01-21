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

        this.state = {};
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
        const nextAction = {
            type: this.props.error.action.type,
            ...this.props.error.action.data,
        };

        this.resetError();
        this.props.dispatch(nextAction);
    }

    render() {
        const snackBar = this.props.error.errorType ? (
            <SnackBar
                text={this.props.error.message}
                iconName={this.props.error.iconName}
                actionText={
                    this.props.error.action && this.props.error.action.text
                }
                handleClose={this.resetError}
                handleAction={
                    this.props.error.action &&
                    this.props.error.action.type &&
                    this.handleAction
                }
                shouldAutoHide={this.props.error.autoHide}
                textStyle={[
                    styles.snackBarText,
                    {
                        marginRight: this.props.error.autoHide ? 0 : 16,
                    },
                ]}
                iconStyle={[
                    styles.snackBarIcon,
                    {
                        color: this.props.error.success
                            ? styleConstants.success
                            : styleConstants.danger,
                    },
                ]}
                actionTextStyle={[
                    styles.actionText,
                    {
                        marginRight: this.props.error.autoHide ? 0 : 16,
                    },
                ]}
                containerStyle={styles.container}
                showCloseButton={!this.props.error.autoHide}
            />
        ) : null;

        return snackBar;
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#323232", // Material design
    },
    snackBarText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
    },
    actionText: {
        fontSize: styleConstants.regularFont,
        color: "yellow",
    },
});

function mapStateToProps(state) {
    return {
        error: state.main.appState.error,
    };
}

export default connect(mapStateToProps)(SnackBarComponent);
