import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

export default class BlankFunctionalComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    static get propTypes() {
        return {};
    }

    render() {
        return (
            <View style={styles.container}>
                <View />
            </View>
        );
    }
}

const styles = StyleSheet.create({});
