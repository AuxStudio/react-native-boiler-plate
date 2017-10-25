import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
    Page,
    HeaderBar,
    InfoBlock,
    InputContainer,
    Input,
    Button,
    Loader,
    SnackBar,
} from "react-native-simple-components";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";
import Icon from "../assets/icons/index";

export class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);

        this.updateUserEmail = this.updateUserEmail.bind(this);
        this.sendPasswordResetEmail = this.sendPasswordResetEmail.bind(this);
    }

    static get propTypes() {
        return {
            userEmail: PropTypes.string,
        };
    }

    updateUserEmail(text) {
        this.props.dispatch({
            type: "UPDATE_USER_EMAIL",
            value: text,
        });
    }

    sendPasswordResetEmail() {
        this.props.dispatch({
            type: "TOGGLE_LOADING",
        });

        this.props.dispatch({
            type: "sendPasswordResetEmail",
            userEmail: this.props.userEmail,
        });
    }

    render() {
        const enableContinueButton =
            this.props.userEmail &&
            this.props.userEmail.indexOf("@") > 0 &&
            this.props.userEmail.indexOf(".") > 0;

        return (
            <Page>
                <Header backButton headerShadow={false} />

                <InputContainer>
                    <InfoBlock
                        title="Forgot your password?"
                        subtitle="Enter your email address and we'll send you a link to reset it."
                        titleColor={styleConstants.white}
                        subtitleColor={styleConstants.white}
                    />

                    <Input
                        placeholder="EMAIL ADDRESS"
                        value={this.props.userEmail}
                        handleChange={this.updateUserEmail}
                        handleFocus={this.resetError}
                        keyboardType="email-address"
                    />
                </InputContainer>

                <Button
                    iconName="check"
                    handlePress={this.sendPasswordResetEmail}
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
        userEmail: state.main.userData.profile.userEmail,
    };
}

export default connect(mapStateToProps)(ForgotPassword);
