import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import { Page } from "react-native-simple-components";

export class BlankPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    static get propTypes() {
        return {};
    }

    render() {
        return (
            <Page style={styles.container}>
                <View />
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const styles = StyleSheet.create({
    container: {},
});

export default connect(mapStateToProps)(BlankPage);
