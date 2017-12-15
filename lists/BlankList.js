import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

export default class BlankList extends React.Component {
    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
    }

    static get propTypes() {
        return {
            data: PropTypes.array,
        };
    }

    renderItem = ({ item, index }) => {
        return <View />;
    };

    render() {
        return (
            <FlatList
                keyExtractor={item => item.id}
                data={this.props.data}
                renderItem={this.renderItem}
                style={styles.wrapper}
                contentContainerStyle={styles.container}
            />
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {},
    container: {},
});
