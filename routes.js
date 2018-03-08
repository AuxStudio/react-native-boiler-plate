import React from "react";
import { Actions, ActionConst, Scene } from "react-native-router-flux";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import ForceUpdate from "./pages/ForceUpdate";

const Scenes = Actions.create(
    <Scene key="root" hideNavBar>
        <Scene
            key="home"
            component={Home}
            type={ActionConst.REPLACE}
            initial={true}
        />
        <Scene key="about" component={About} initial={false} />
        <Scene
            key="forceUpdate"
            component={ForceUpdate}
            type={ActionConst.RESET}
            initial={false}
        />
    </Scene>,
);

export default Scenes;
