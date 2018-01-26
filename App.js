import React from "react";
import { Router } from "react-native-router-flux";
import { Provider, connect } from "react-redux";

import { store } from "./store";
import Scenes from "./routes";

// Connect router to store
const ConnectedRouter = connect()(Router);

// Wrappers
import VersionControlHandler from "./wrappers/VersionControlHandler";
import AuthHandler from "./wrappers/AuthHandler";
import DataHandler from "./wrappers/DataHandler";
import NetworkHandler from "./wrappers/NetworkHandler";
import GeolocationHandler from "./wrappers/GeolocationHandler";
import SnackBarHandler from "./wrappers/SnackBarHandler";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <VersionControlHandler>
                    <AuthHandler>
                        <DataHandler>
                            <NetworkHandler>
                                <GeolocationHandler>
                                    <SnackBarHandler>
                                        <ConnectedRouter scenes={Scenes} />
                                    </SnackBarHandler>
                                </GeolocationHandler>
                            </NetworkHandler>
                        </DataHandler>
                    </AuthHandler>
                </VersionControlHandler>
            </Provider>
        );
    }
}
