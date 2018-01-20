import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import firebase from "react-native-firebase";

export class DataHandler extends React.Component {
    constructor(props) {
        super(props);

        this.setPersistence = this.setPersistence.bind(this);
        this.setRealTimeMode = this.setRealTimeMode.bind(this);
    }

    static get propTypes() {
        return {};
    }

    componentDidMount() {
        // delay fixes missing data fetch on first app load (I assume because of auth)
        setTimeout(() => {
            this.setPersistence();
            this.setRealTimeMode();
        }, 500);
    }

    setPersistence() {
        // Set persistence for offline capability
        firebase
            .database()
            .ref("app")
            .keepSynced(true);
        firebase
            .database()
            .ref("users")
            .keepSynced(true);
    }

    setRealTimeMode() {
        // Listen for live changes to db
        firebase
            .database()
            .ref("app/")
            .on(
                "value",
                snapshot => {
                    this.props.dispatch({
                        type: "SET_APP_DATA",
                        data: snapshot.val(),
                    });
                },
                error => {
                    // Do nothing - silent error
                }
            );

        firebase
            .database()
            .ref("users/")
            .on(
                "value",
                snapshot => {
                    this.props.dispatch({
                        type: "SET_USERS_DATA",
                        data: snapshot.val(),
                    });
                },
                error => {
                    // Do nothing - silent error
                }
            );
    }

    render() {
        return this.props.children;
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(DataHandler);
