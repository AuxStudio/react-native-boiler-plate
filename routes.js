import React from "react";
import { Actions, ActionConst, Scene } from "react-native-router-flux";

// Pages
import Home from "./pages/Home";

// Wrappers
import AuthHandler from "./wrappers/AuthHandler";
import DataHandler from "./wrappers/DataHandler";

const Scenes = Actions.create(
    <Scene key="root" hideNavBar>
        <Scene
            key="home"
            component={AuthHandler(DataHandler(Home))}
            type={ActionConst.REPLACE}
            initial={true}
        />
    </Scene>
);

export default Scenes;
