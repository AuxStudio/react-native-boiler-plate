import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CloudData from "../cloudData/index";

export class DataHandler extends React.Component {
    constructor(props) {
        super(props);

        this.setRealTimeMode = this.setRealTimeMode.bind(this);
    }

    static get propTypes() {
        return {
            authenticated: PropTypes.bool,
        };
    }

    componentDidUpdate(prevProps) {
        // Once authenticated, handle data
        if (this.props.authenticated && !prevProps.authenticated) {
            this.setRealTimeMode();
        }
    }

    setRealTimeMode() {
        // Listen for live changes to db
        CloudData.listenForData("app", data => {
            this.props.dispatch({
                type: "SET_DATA",
                node: "app",
                data,
            });
        });

        CloudData.listenForData("users", data => {
            this.props.dispatch({
                type: "SET_DATA",
                node: "users",
                data,
            });
        });
    }

    render() {
        return this.props.children;
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.main.userAuth.authenticated,
    };
}

export default connect(mapStateToProps)(DataHandler);
