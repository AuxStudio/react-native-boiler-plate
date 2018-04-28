import { Dimensions } from 'react-native';

const dimensions = {};
const { width, height } = Dimensions.get('window');

// Window
dimensions.windowWidth = width;
dimensions.windowHeight = height;

// Padding
// dimensions.padding = {};
dimensions.padding.small = 8;
dimensions.padding.large = 16;

// Margin
// dimensions.margin = {};
dimensions.margin.small = 8;
dimensions.margin.large = 16;

export default dimensions;
