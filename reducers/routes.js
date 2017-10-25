import { ActionConst } from "react-native-router-flux";

let cloneObject = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};

const initialState = {
    scene: {},
};

export default function sceneReducer(state = initialState, action = {}) {
    switch (action.type) {
        case ActionConst.FOCUS:
            return {
                ...state,
                scene: action.scene,
            };

        default:
            return state;
    }
}
