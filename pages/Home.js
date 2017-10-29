import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Page, Touchable } from "react-native-simple-components";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.handleAuth = this.handleAuth.bind(this);
        this.signOut = this.signOut.bind(this);

        this.state = {};
    }

    static get propTypes() {
        return {};
    }

    handleAuth() {
        this.props.dispatch({
            type: "signInUserWithGoogle",
        });
    }

    signOut() {
        this.props.dispatch({
            type: "signOutUser",
        });
    }

    render() {
        console.log(this.props.user);
        return (
            <Page>
                <Touchable onPress={this.handleAuth}>
                    <Text>Login</Text>
                </Touchable>
                <Touchable onPress={this.signOut}>
                    <Text>Sign Out</Text>
                </Touchable>
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.main.userData.profile,
    };
}

export default connect(mapStateToProps)(Home);
