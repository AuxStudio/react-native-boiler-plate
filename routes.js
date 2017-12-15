import React from "react";
import { Actions, ActionConst, Scene } from "react-native-router-flux";

import Home from "./pages/Home";

const Scenes = Actions.create(
    <Scene key="root" hideNavBar>
        />
        <Scene
            key="home"
            component={Home}
            type={ActionConst.REPLACE}
            initial={true}
        />
    </Scene>
);

export default Scenes;
