import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Page, HeaderBar } from "react-native-simple-components";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

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
                <HeaderBar />
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Home);
