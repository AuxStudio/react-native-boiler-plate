import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

export default function BlankDumbComponent(props) {
    /*
    static get propTypes() {
        return {};
    }
*/

    return (
        <View style={styles.container}>
            <View />
        </View>
    );
}

const styles = StyleSheet.create({});
