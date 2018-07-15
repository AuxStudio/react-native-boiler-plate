import { Actions } from 'react-native-router-flux';

// Global navigate action
// Returns null
const navigate = (scene, props, shouldReset, shouldReplace) => {
  if (scene) {
    if (shouldReset) {
      Actions.reset({ sceneKey: scene }, props);
    } else if (shouldReplace) {
      Actions.replace({ sceneKey: scene }, props);
    } else {
      Actions[scene](props);
    }
  } else {
    Actions.pop();

    if (props) {
      Actions.refresh(props);
    }
  }
};

export default navigate;
