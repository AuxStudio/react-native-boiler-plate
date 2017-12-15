import React from "react";
import { Router } from "react-native-router-flux";
import { Provider, connect } from "react-redux";

import { store } from "./store";
import Scenes from "./routes";

// Connect router to store
const ConnectedRouter = connect()(Router);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter scenes={Scenes} />
            </Provider>
        );
    }
}
