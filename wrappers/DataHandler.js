import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export default function(WrappedComponent) {
    class DataHandler extends React.Component {
        constructor(props) {
            super(props);

            this.handleGetData = this.handleGetData.bind(this);
            this.getData = this.getData.bind(this);

            this.state = {
                isFetchingData: {
                    app: false,
                    users: false,
                },
            };
        }

        static get propTypes() {
            return {
                appData: PropTypes.object,
                usersData: PropTypes.object,
            };
        }

        componentDidMount() {
            this.handleGetData();
        }

        componentDidUpdate() {
            this.handleGetData();
        }

        handleGetData() {
            if (this.props.authenticated) {
                if (!this.state.isFetchingData.app && !this.props.appData) {
                    this.getData("app");
                }

                if (!this.state.isFetchingData.users && !this.props.usersData) {
                    this.getData("users");
                }
            }
        }

        getData(node) {
            let state = this.state;
            state.isFetchingData[node] = true;
            this.setState(state);

            const nextActionType =
                node === "app" ? "SET_APP_DATA" : "SET_USERS_DATA";

            this.props.dispatch({
                type: "getData",
                node,
                nextActionType,
            });
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return {
            appData: state.main.appData.app,
            usersData: state.main.appData.users,
        };
    }

    return connect(mapStateToProps)(DataHandler);
}
