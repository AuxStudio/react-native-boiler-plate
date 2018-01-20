import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class AuthHandler extends React.Component {
    static get propTypes() {
        return {
            authenticated: PropTypes.bool,
        };
    }

    componentWillMount() {
        if (!this.props.authenticated) {
            this.props.dispatch({
                type: "getUserAuth",
            });
        }
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

export default connect(mapStateToProps)(AuthHandler);
