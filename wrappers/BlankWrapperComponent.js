import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class BlankWrapperComponent extends React.Component {
    static get propTypes() {
        return {};
    }

    render() {
        return this.props.children;
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(BlankWrapperComponent);
