import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export default function(WrappedComponent) {
    class BlankWrapperComponent extends React.Component {
        static get propTypes() {
            return {};
        }

        componentDidMount() {}

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return {};
    }

    return connect(mapStateToProps)(BlankWrapperComponent);
}
