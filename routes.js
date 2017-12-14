import React from "react";
import { Actions, ActionConst, Scene } from "react-native-router-flux";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignInOptions from "./pages/SignInOptions";
import SignInEmail from "./pages/SignInEmail";
import ForgotPassword from "./pages/ForgotPassword";

const Scenes = Actions.create(
    <Scene key="root" hideNavBar>
        />
        <Scene
            key="home"
            component={Home}
            type={ActionConst.REPLACE}
            initial={true}
        />
        <Scene
            key="SignIn"
            component={SignIn}
            type={ActionConst.REPLACE}
            initial={false}
        />
        <Scene key="signInOptions" component={SignInOptions} initial={false} />
        <Scene key="SignInEmail" component={SignInEmail} initial={false} />
        <Scene
            key="forgotPassword"
            component={ForgotPassword}
            initial={false}
        />
    </Scene>
);

export default Scenes;
