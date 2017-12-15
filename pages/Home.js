import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import { Page } from "react-native-simple-components";

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    static get propTypes() {
        return {};
    }

    render() {
        return (
            <Page>
                <View />
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const styles = StyleSheet.create({});

export default connect(mapStateToProps)(Home);
