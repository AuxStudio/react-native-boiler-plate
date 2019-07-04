import { Platform } from 'react-native';

import dimensions from '../dimensions';

const helpers = {};

helpers.iPhoneX = Platform.OS === 'ios' && dimensions.windowHeight === 812;

export default helpers;
