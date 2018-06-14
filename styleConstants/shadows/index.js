import { Platform } from 'react-native';

import colors from './colors';

// Elevation does not work on Android V4 so we add a border as a fallback
const isEarlyAndroid = Platform.OS === 'android' && Platform.Version <= 19;

const shadows = {
  small: {
    elevation: 2,
    borderWidth: isEarlyAndroid ? 1 : 0,
    borderColor: isEarlyAndroid ? colors.dividerColor : null,

    // iOS
    shadowColor: colors.primaryText,
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  regular: {
    elevation: 6,
    borderWidth: isEarlyAndroid ? 1 : 0,
    borderColor: isEarlyAndroid ? colors.dividerColor : null,

    // iOS
    shadowColor: colors.primaryText,
    shadowOpacity: 0.33,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  large: {
    elevation: 12,
    borderWidth: isEarlyAndroid ? 1 : 0,
    borderColor: isEarlyAndroid ? colors.dividerColor : null,

    // iOS
    shadowColor: colors.primaryText,
    shadowOpacity: 0.33,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
};

export default shadows;
