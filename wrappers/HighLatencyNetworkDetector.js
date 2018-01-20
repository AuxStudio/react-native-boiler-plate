import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import config from "../config";
import Analytics from "../analytics";

export class HighLatencyDetector extends React.Component {
    constructor(props) {
        super(props);

        this.startTimer = this.startTimer.bind(this);
        this.clearTimer = this.clearTimer.bind(this);

        this.timer;

        this.state = {
            time: 0,
        };
    }

    static get propTypes() {
        return {
            loading: PropTypes.bool,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.loading && !prevProps.loading) {
            // New loading event started
            this.startTimer();
        } else if (!this.props.loading && prevProps.loading) {
            // Loading event ended
            this.clearTimer();
        }

        // Check to see if time > config.latencyTimeout and dispatch an error event if so
        if (this.state.time && this.state.time > config.latencyTimeout) {
            Analytics.logEvent("network_high_latency");

            this.props.dispatch({
                type: "SET_ERROR",
                errorType: "NETWORK",
                message: "Slow network detected. Please try again later.",
                iconName: "error-outline",
            });

            this.clearTimer();
        }
    }

    startTimer() {
        this.timer = null;

        this.timer = setInterval(() => {
            this.setState({
                time: (this.state.time += 1),
            });
        }, 1000);
    }

    clearTimer() {
        clearInterval(this.timer);

        this.setState({
            time: 0,
        });
    }

    render() {
        return this.props.children;
    }
}

function mapStateToProps(state) {
    return {
        loading: state.main.appState.loading,
    };
}

export default connect(mapStateToProps)(HighLatencyDetector);
