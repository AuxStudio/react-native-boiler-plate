import { Dimensions } from 'react-native';

const dimensions = {};
const { width, height } = Dimensions.get('window');

dimensions.window = {
  width,
  height,
};

dimensions.padding = {
  small: 8,
  large: 16,
};

dimensions.margin = {
  small: 8,
  large: 16,
};

export default dimensions;
