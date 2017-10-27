import React from "react";
import { Actions, ActionConst, Scene } from "react-native-router-flux";

import Splash from "./pages/Splash";
import SignIn from "./pages/SignIn";
import SignInOptions from "./pages/SignInOptions";
import SignInEmail from "./pages/SignInEmail";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";

const Scenes = Actions.create(
    <Scene key="root" hideNavBar>
        <Scene key="splash" component={Splash} initial={true} />
        <Scene
            key="SignIn"
            component={SignIn}
            type={ActionConst.REPLACE}
            initial={false}
        />
        <Scene key="signInOptions" component={SignInOptions} initial={false} />
        <Scene
            key="SignInEmail"
            component={SignInEmail}
            initial={false}
        />
        <Scene
            key="forgotPassword"
            component={ForgotPassword}
            initial={false}
        />
        <Scene
            key="home"
            component={Home}
            type={ActionConst.REPLACE}
            initial={false}
        />
    </Scene>
);

export default Scenes;
